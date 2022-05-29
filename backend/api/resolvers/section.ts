import { UserInputError } from "apollo-server";
import { ObjectId } from "mongodb";
import {
	Arg,
	Ctx,
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
import { Context } from "../util/auth";
import { ObjectIdScalar } from "../util/scalars";
import { localize } from "../util/typegoose-middleware";
import { SectionInput } from "./types/section";

@Service()
@Resolver(() => Section)
export class SectionResolver {
	constructor(
		private readonly sectionService = new CRUDservice(Section),
		private readonly submissionService = new CRUDservice(Submission)
	) {}

	@Query(() => Section)
	async section(
		@Arg("id", () => ObjectIdScalar) id: ObjectId
	): Promise<Section> {
		const section = await this.sectionService.findOne({ _id: id });
		if (!section) throw new UserInputError("Conference section not found!");

		return section;
	}

	@Mutation(() => Section)
	async createSection(
		@Arg("data") sectionInput: SectionInput,
		@Ctx() { locale }: Context
	): Promise<Section> {
		return await this.sectionService.create(localize(sectionInput, locale));
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

	@Mutation(() => Boolean)
	async deleteSection(
		@Arg("id", () => ObjectIdScalar) id: ObjectId
	): Promise<boolean> {
		const { deletedCount } = await this.sectionService.delete({ _id: id });

		return deletedCount > 0;
	}

	@FieldResolver(() => [Submission])
	async submissions(@Root() { id }: Section): Promise<Submission[]> {
		return await this.submissionService.findAll({ section: id });
	}
}
