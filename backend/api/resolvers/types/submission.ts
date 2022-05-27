import { IsEmail } from "class-validator";
import { ObjectId } from "mongodb";
import { Authorized, Field, InputType } from "type-graphql";

import { Status } from "../../entitites/Submission";

@InputType()
class KeywordInput {
	@Field()
	keyword: string;
}

@InputType({ description: "Submission entity model type" })
export class SubmissionInput {
	@Field()
	name: string;

	@Field()
	abstract: string;

	@Field(() => [KeywordInput])
	keywords: KeywordInput[];

	@Field({ nullable: true })
	conferenceId?: ObjectId;

	@Field({ nullable: true })
	sectionId?: ObjectId;

	@Field({ nullable: true })
	submissionUrl?: string;

	@Field(() => [String], { nullable: true })
	@IsEmail({}, { each: true })
	authors?: string[];

	@Authorized(["ADMIN"])
	@Field(() => Status, { nullable: true })
	status?: Status;
}
