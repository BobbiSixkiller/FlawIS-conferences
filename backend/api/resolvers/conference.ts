import { UserInputError } from "apollo-server";
import { ObjectId } from "mongodb";
import {
	Arg,
	FieldResolver,
	Mutation,
	Query,
	Resolver,
	Root,
} from "type-graphql";
import { Service } from "typedi";
import { Conference } from "../entitites/Conference";
import { Section } from "../entitites/Section";
import { CRUDservice } from "../services/CRUDservice";
import { ConferenceInput } from "./types/conference";

@Service()
@Resolver(() => Conference)
export class ConferenceResolver {
	constructor(
		private readonly conferenceService = new CRUDservice(Conference),
		private readonly sectionService = new CRUDservice(Section)
	) {}

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

	@Mutation(() => Conference)
	async createConference(
		@Arg("data") conferenceInput: ConferenceInput
	): Promise<Conference> {
		return await this.conferenceService.create(conferenceInput);
	}

	@Mutation(() => Conference)
	async updateConference(
		@Arg("id") id: ObjectId,
		@Arg("data") conferenceInput: ConferenceInput
	) {
		const conference = await this.conferenceService.findOne({ _id: id });
		if (!conference) throw new UserInputError("Conference not found!");

		for (const [key, value] of Object.entries(conferenceInput)) {
			conference[key as keyof ConferenceInput] = value;
		}

		return await conference.save();
	}

	@FieldResolver(() => [Section])
	async sections(@Root() { id }: Conference): Promise<Section[]> {
		return await this.sectionService.findAll({ conference: id });
	}
}
