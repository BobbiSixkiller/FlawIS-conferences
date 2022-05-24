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
import { Section } from "../entitites/Section";
import { Submission } from "../entitites/Submission";
import { CRUDservice } from "../services/CRUDservice";
import { SectionInput } from "./types/section";

@Service()
@Resolver(() => Section)
export class SectionResolver {
	constructor(
		private readonly sectionService = new CRUDservice(Section),
		private readonly submissionService = new CRUDservice(Submission)
	) {}

	@Query(() => Section)
	async section(@Arg("id") id: ObjectId): Promise<Section> {
		const section = await this.sectionService.findOne({ _id: id });
		if (!section) throw new UserInputError("Conference section not found!");

		return section;
	}

	@Mutation(() => Section)
	async createSection(
		@Arg("data") sectionInput: SectionInput
	): Promise<Section> {
		return await this.sectionService.create(sectionInput);
	}

	@Mutation(() => Section)
	async updateSection(
		@Arg("id") id: ObjectId,
		@Arg("data") sectionInput: SectionInput
	) {
		const section = await this.sectionService.findOne({ _id: id });
		if (!section) throw new UserInputError("Conference section not found!");

		for (const [key, value] of Object.entries(sectionInput)) {
			section[key as keyof Section] = value;
		}

		return await section.save();
	}

	@FieldResolver(() => [Submission])
	async submissions(@Root() { id }: Section): Promise<Submission[]> {
		return await this.submissionService.findAll({ section: id });
	}
}
