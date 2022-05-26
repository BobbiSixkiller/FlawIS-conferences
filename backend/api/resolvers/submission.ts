import { ObjectId } from "mongodb";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Submission } from "../entitites/Submission";
import { CRUDservice } from "../services/CRUDservice";
import { SubmissionInput } from "./types/submission";

@Resolver(() => Submission)
export class SubmissionResolver {
	constructor(
		private readonly submissionService = new CRUDservice(Submission)
	) {}

	@Query(() => Submission)
	async submission(@Arg("id") id: ObjectId): Promise<Submission> {
		const submission = await this.submissionService.findOne({ _id: id });
		if (!submission) throw new Error("Submission not found!");

		return submission;
	}

	@Mutation(() => Submission)
	async addSubmission(@Arg("data") data: SubmissionInput): Promise<Submission> {
		return await this.submissionService.create(data);
	}

	@Mutation(() => Submission)
	async updateSubmission(
		@Arg("id") id: ObjectId,
		@Arg("data") data: SubmissionInput
	): Promise<Submission> {
		const submission = await this.submissionService.findOne({ _id: id });
		if (!submission) throw new Error("Submission not found!");

		for (const [key, value] of Object.entries(data)) {
			submission[key as keyof Submission] = value;
		}

		return await submission.save();
	}

	@Mutation(() => Boolean)
	async deleteSubmission(@Arg("id") id: ObjectId): Promise<boolean> {
		const { deletedCount } = await this.submissionService.delete({ _id: id });
		return deletedCount > 0;
	}
}
