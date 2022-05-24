import {
	Arg,
	Authorized,
	Ctx,
	FieldResolver,
	Mutation,
	Query,
	Resolver,
	Root,
} from "type-graphql";
import { ObjectId } from "mongodb";
import { UserInputError } from "apollo-server";
import { Service } from "typedi";
import { CRUDservice } from "../services/CRUDservice";

import { Attendee } from "../entitites/Attendee";
import { Conference } from "../entitites/Conference";
import { Submission } from "../entitites/Submission";
import { Context } from "../util/auth";
import { VerifiedTicket } from "../util/types";
import { CheckTicket } from "../util/validation";
import { AttendeeInput, InvoiceInput } from "./types/attendee";

import env from "dotenv";
import { sendMail } from "../util/sendMail";
import { getModelForClass } from "@typegoose/typegoose";

env.config();

@Service()
@Resolver(() => Attendee)
export class AttendeeResolver {
	constructor(
		private readonly attendeeService = new CRUDservice(Attendee),
		private readonly conferenceService = new CRUDservice(Conference),
		private readonly submissionService = new CRUDservice(Submission)
	) {
		const pipeline = [{ $match: { operationType: "insert" } }];

		attendeeService.dataModel
			.watch([], { fullDocument: "updateLookup" })
			.on("change", (e) => {
				console.log(e);
				sendMail;
			});
	}

	@Query(() => [Attendee])
	async attendees(): Promise<Attendee[]> {
		return await this.attendeeService.findAll({});
	}

	@Authorized()
	@Mutation(() => Attendee)
	async addAttendee(
		@Arg("data") { conferenceId, billing }: AttendeeInput,
		@CheckTicket() { ticket, conference }: VerifiedTicket,
		@Ctx() { user }: Context
	): Promise<Attendee> {
		const ticketPrice = ticket.price / Number(process.env.VAT);

		return await this.attendeeService.create({
			conference: conferenceId,
			user: {
				id: user!.id,
				withSubmission: ticket.withSubmission,
				online: ticket.online,
			},
			invoice: {
				payer: billing,
				issuer: conference.host,
				body: {
					variableSymbol: conference.variableSymbol,
					ticketPrice,
					vat: ticket.price - ticketPrice,
					body: "Test invoice",
					comment:
						"In case of not due payment the host organisation is reserving the right to cancel attendee",
				},
			},
		});
	}

	@Authorized()
	@Mutation(() => Attendee)
	async updateInvoice(
		@Arg("id") id: ObjectId,
		@Arg("data") invoiceInput: InvoiceInput
	): Promise<Attendee> {
		const attendee = await this.attendeeService.findOne({ _id: id });
		if (!attendee) throw new UserInputError("Attendee not found!");

		for (const [key, value] of Object.entries(invoiceInput)) {
			attendee.invoice[key as keyof InvoiceInput] = value;
		}

		return attendee.save();
	}

	@Authorized()
	@Mutation(() => Boolean)
	async removeAttendee(@Arg("id") id: ObjectId): Promise<boolean> {
		const { deletedCount } = await this.attendeeService.delete({ _id: id });

		return deletedCount > 0;
	}

	@FieldResolver(() => Conference, { nullable: true })
	async conference(
		@Root() { conference }: Attendee
	): Promise<Conference | null> {
		return await this.conferenceService.findOne({ _id: conference });
	}

	@FieldResolver(() => [Submission], { nullable: true })
	async submissions(
		@Root() { conference, user }: Attendee
	): Promise<Submission[]> {
		return await this.submissionService.findAll({
			conference: conference,
			authors: { id: user.id },
		});
	}
}
