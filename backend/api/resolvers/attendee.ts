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
import fs from "fs";
import { CRUDservice } from "../services/CRUDservice";

import { Attendee } from "../entitites/Attendee";
import { Conference } from "../entitites/Conference";
import { Submission } from "../entitites/Submission";
import { AttendeeInput, InvoiceInput } from "./types/attendee";

import { Context } from "../util/auth";
import { VerifiedTicket } from "../util/types";
import { CheckTicket } from "../util/decorators";
import { sendMail } from "../util/mail";

import env from "dotenv";
import { generatePdf, invoice } from "../util/invoice";

env.config();

@Service()
@Resolver(() => Attendee)
export class AttendeeResolver {
	constructor(
		private readonly attendeeService = new CRUDservice(Attendee),
		private readonly conferenceService = new CRUDservice(Conference),
		private readonly submissionService = new CRUDservice(Submission)
	) {}

	@Query(() => [Attendee])
	async attendees(): Promise<Attendee[]> {
		return await this.attendeeService.findAll({});
	}

	//Refactor to check for co-author header and run a submission update to push new coauthor into the authors array
	@Authorized()
	@Mutation(() => Attendee)
	async addAttendee(
		@Arg("data") { conferenceId, billing }: AttendeeInput,
		@CheckTicket() { ticket, conference }: VerifiedTicket,
		@Ctx() { user }: Context
	): Promise<Attendee> {
		const ticketPrice = ticket.price / Number(process.env.VAT || 1.2);

		const attendee = await this.attendeeService.create({
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

		const { pdf, path } = await generatePdf(invoice(attendee.invoice, "en"));

		const locale: string = "en";

		sendMail(
			user!.email,
			conference.name,
			`Dear ${user!.name},\n\nYou have been successfully registered to ${
				conference.name
			}! You can find your invoice in the attachmenets.\n\nBest regards,\n\n${
				conference.name
			} team`,
			`<html><head></head><body><p>Dear ${
				user!.name
			},</p><p>You have been successfully registered to ${
				conference.name
			}! You can find your invoice in the attachmenets.</p><p>Best regards,</p><p>${
				conference.name
			} team</p></body></html>`,
			[
				{
					filename: locale === "en" ? "Invoice.pdf" : "Faktúra.pdf",
					content: pdf,
				},
			]
		);

		fs.unlink(path, (err) => {
			if (err) console.log(err);
		});

		return attendee;
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
