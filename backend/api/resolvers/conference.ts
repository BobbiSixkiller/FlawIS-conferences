import { UserInputError } from "apollo-server";
import { ObjectId } from "mongodb";
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
import { Conference } from "../entitites/Conference";
import { Section } from "../entitites/Section";
import { CRUDservice } from "../services/CRUDservice";
import { Context } from "../util/auth";
import { localizeInput } from "../util/locale";
import { ObjectIdScalar } from "../util/scalars";
import { ConferenceInput } from "./types/conference";

@Service()
@Resolver(() => Conference)
export class ConferenceResolver {
	constructor(
		private readonly conferenceService = new CRUDservice(Conference),
		private readonly sectionService = new CRUDservice(Section),
		private readonly attendeeService = new CRUDservice(Attendee)
	) {}

	@Query(() => Conference)
	async conference(
		@Arg("id", () => ObjectIdScalar) id: ObjectId
	): Promise<Conference> {
		const conference = await this.conferenceService.findOne({ _id: id });
		if (!conference) throw new UserInputError("Conference not found!");

		return conference;
	}

	@Query(() => [Conference])
	async conferences(): Promise<Conference[]> {
		return await this.conferenceService.findAll({});
	}

	@Query(() => [Conference])
	async upcomingConferences(): Promise<Conference[]> {
		return await this.conferenceService.findAll({
			regStart: { $gt: Date.now() },
		});
	}

	@Authorized()
	@Mutation(() => Conference)
	async createConference(
		@Arg("data") conferenceInput: ConferenceInput,
		@Ctx() { locale }: Context
	): Promise<Conference> {
		return await this.conferenceService.create(
			localizeInput(conferenceInput, conferenceInput.translations, locale)
		);
	}

	@Authorized()
	@Mutation(() => Conference)
	async updateConference(
		@Arg("id", () => ObjectIdScalar) id: ObjectId,
		@Arg("data") conferenceInput: ConferenceInput,
		@Ctx() { locale }: Context
	) {
		const conference = await this.conferenceService.findOne({ _id: id });
		if (!conference) throw new UserInputError("Conference not found!");

		for (const [key, value] of Object.entries(
			localizeInput(conferenceInput, conferenceInput.translations, locale)
		)) {
			conference[key as keyof Conference] = value;
		}

		return await conference.save();
	}

	@Authorized()
	@FieldResolver(() => [Section])
	async sections(@Root() { id }: Conference): Promise<Section[]> {
		return await this.sectionService.findAll({ conference: id });
	}

	@Authorized()
	@FieldResolver(() => [Attendee])
	async attendees(
		@Root() { id }: Conference,
		@Ctx() { user }: Context
	): Promise<Attendee[]> {
		if (user!.role === "ADMIN" || user!.role === "SUPERVISOR") {
			return await this.attendeeService.findAll({ conference: id });
		} else {
			return await this.attendeeService.findAll({
				conference: id,
				"user.id": user!.id,
			});
		}
	}
}
