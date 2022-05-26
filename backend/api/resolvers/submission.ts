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
import { Conference } from "../entitites/Conference";
import { Section } from "../entitites/Section";
import { Submission } from "../entitites/Submission";
import { CRUDservice } from "../services/CRUDservice";
import { Context, signJwt } from "../util/auth";
import { sendMail } from "../util/mail";
import { AuthorRequest, SubmissionInput } from "./types/submission";

@Service()
@Resolver(() => Submission)
export class SubmissionResolver {
	constructor(
		private readonly submissionService = new CRUDservice(Submission),
		private readonly conferenceService = new CRUDservice(Conference),
		private readonly sectionService = new CRUDservice(Section)
	) {}

	@Query(() => Submission)
	async submission(@Arg("id") id: ObjectId): Promise<Submission> {
		const submission = await this.submissionService.findOne({ _id: id });
		if (!submission) throw new Error("Submission not found!");

		return submission;
	}

	@Authorized()
	@Mutation(() => Submission)
	async addSubmission(
		@Arg("data") data: SubmissionInput,
		@Ctx() { user }: Context
	): Promise<Submission> {
		return await this.submissionService.create({
			...data,
			authors: [{ id: user!.id }],
		});
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
	async requestCoAuthor(
		@Arg("data")
		{
			coAuthors,
			submissionId,
			conferenceId,
			conferenceName,
			sectionName,
			submissionName,
		}: AuthorRequest,
		@Ctx() { user }: Context
	): Promise<boolean> {
		const token = signJwt({ submissionId, conferenceId }, { expiresIn: "7d" });

		sendMail(
			coAuthors.map((i) => i.email),
			conferenceName,
			`You've been added to authors list of the submission: ${submissionName} uploaded by ${
				user!.name
			} to section "${sectionName}" of the ${conferenceName} conference.\n\nPlease copy following link to your browser:\n\n${token}\n\nBest regards,\n\n${conferenceName} team`,
			`<html><head></head><body><p>You've been added to authors list of the submission: ${submissionName} uploaded by ${
				user!.name
			} to section "${sectionName}" of the ${conferenceName} conference.</p><p>If you wish to participate please click on the following <a>link ${token}</a></p><p>Best regards,</p><p>${conferenceName} team</p></body></html>`,
			[]
		);

		return true;
	}

	@Authorized()
	@Mutation(() => Submission)
	async addCoAuthor(
		@Arg("id") id: ObjectId,
		@Ctx() { user }: Context
	): Promise<Submission> {
		const submission = await this.submissionService.findOne({ _id: id });
		if (!submission) throw new Error("Submission not found!");

		submission.authors.push({ id: user!.id });

		return await submission.save();
	}

	@Mutation(() => Boolean)
	async deleteSubmission(@Arg("id") id: ObjectId): Promise<boolean> {
		const { deletedCount } = await this.submissionService.delete({ _id: id });
		return deletedCount > 0;
	}

	@FieldResolver(() => Conference, { nullable: true })
	async conference(
		@Root() { conference }: Submission
	): Promise<Conference | null> {
		return await this.conferenceService.findOne({ _id: conference });
	}

	@FieldResolver(() => Section, { nullable: true })
	async section(@Root() { section }: Submission): Promise<Section | null> {
		return await this.sectionService.findOne({ _id: section });
	}
}
