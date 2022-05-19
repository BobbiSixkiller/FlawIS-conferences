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
import { Service } from "typedi";

import { Attendee } from "../entitites/Attendee";
import { Conference, Ticket } from "../entitites/Conference";
import { CRUDservice } from "../services/CRUDservice";
import { Context } from "../util/auth";
import { CheckTicket } from "../util/validation";
import { AttendeeInput } from "./types/attendee";

@Service()
@Resolver(() => Attendee)
export class AttendeeResolver {
	constructor(
		private readonly attendeeService = new CRUDservice(Attendee),
		private readonly conferenceService = new CRUDservice(Conference)
	) {}

	@Query(() => [Attendee])
	async attendees(): Promise<Attendee[]> {
		return await this.attendeeService.findAll({});
	}

	@Authorized()
	@Mutation(() => Attendee)
	async addAttendee(
		// @Arg("conferenceId") conferenceId: ObjectId,
		// @Arg("ticketId") ticketId: ObjectId,
		@Arg("data") { conferenceId }: AttendeeInput,
		@CheckTicket() ticket: Ticket,
		@Ctx() { user }: Context
	): Promise<Attendee> {
		console.log(ticket);

		const attendee = await this.attendeeService.create({
			conference: conferenceId,
			user: {
				id: user!.id,
				email: user!.email,
				withSubmission: ticket.withSubmission,
				online: ticket.online,
			},
		});

		return attendee;
	}

	@FieldResolver(() => Conference, { nullable: true })
	async conference(
		@Root() { conference }: Attendee
	): Promise<Conference | null> {
		return await this.conferenceService.findOne({ _id: conference });
	}
}
