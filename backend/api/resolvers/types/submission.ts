import { IsEmail } from "class-validator";
import { ObjectId } from "mongodb";
import { Authorized, Field, InputType } from "type-graphql";
import { Conference } from "../../entitites/Conference";
import { Section } from "../../entitites/Section";

import { Status, Submission } from "../../entitites/Submission";
import { Ref } from "../../util/types";
import { RefDocExists } from "../../util/validation";

@InputType()
class AuthorInput {
	@Field()
	id: ObjectId;
}

@InputType()
class KeywordInput {
	@Field()
	keyword: string;
}

@InputType()
class CoAuthorInput {
	@Field()
	@IsEmail()
	email: string;
}

@InputType({ description: "Submission entity model type" })
export class SubmissionInput implements Partial<Submission> {
	@Field()
	name: string;

	@Field()
	abstract: string;

	@Field(() => [KeywordInput])
	keywords: KeywordInput[];

	@Field({ nullable: true })
	@RefDocExists(Conference, { message: "Conference not found!" })
	conference?: ObjectId;

	@Field({ nullable: true })
	@RefDocExists(Section, { message: "Section not found!" })
	section?: ObjectId;

	@Field({ nullable: true })
	submissionUrl?: string;

	@Field(() => [AuthorInput], { nullable: true })
	authors?: AuthorInput[];

	@Authorized(["ADMIN"])
	@Field(() => Status, { nullable: true })
	status?: Status;
}

@InputType({
	description: "Input type for requesting co-authors of the submission",
})
export class AuthorRequest {
	@Field()
	submissionId: ObjectId;

	@Field()
	submissionName: string;

	@Field()
	conferenceId: ObjectId;

	@Field()
	conferenceName: string;

	@Field()
	sectionName: string;

	@Field(() => [CoAuthorInput])
	coAuthors: CoAuthorInput[];
}
