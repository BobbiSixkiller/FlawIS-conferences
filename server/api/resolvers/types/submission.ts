import {
	ArrayMinSize,
	IsEmail,
	IsLocale,
	IsMongoId,
	IsUrl,
	MaxLength,
} from "class-validator";
import { ObjectId } from "mongodb";
import { Authorized, Field, InputType } from "type-graphql";

import { Status } from "../../entitites/Submission";

@InputType()
class SubmissionInputTranslation {
	@Field()
	@IsLocale()
	language: string;

	@Field()
	@MaxLength(250, { message: "Submission name can have max 250 characters!" })
	name: string;

	@Field()
	@MaxLength(1000, { message: "Submission name can have max 1000 characters!" })
	abstract: string;

	@Field(() => [String])
	@ArrayMinSize(1, { message: "You must include at least one keyword!" })
	@MaxLength(250, {
		message: "Keyword can have max 250 characters!",
		each: true,
	})
	keywords: string[];
}

@InputType()
export class SubmissionInput {
	@Field()
	@MaxLength(250, { message: "Submission name can have max 250 characters!" })
	name: string;

	@Field()
	@MaxLength(1000, { message: "Submission name can have max 1000 characters!" })
	abstract: string;

	@Field(() => [String])
	@ArrayMinSize(1, { message: "You must include at least one keyword!" })
	@MaxLength(250, {
		message: "Keyword can have max 250 characters!",
		each: true,
	})
	keywords: string[];

	@Field({ nullable: true })
	conferenceId?: ObjectId;

	@Field({ nullable: true })
	sectionId?: ObjectId;

	@Field({ nullable: true })
	@IsUrl()
	submissionUrl?: string;

	@Field(() => [String], { nullable: true })
	@IsEmail({}, { each: true })
	authors?: string[];

	@Authorized(["ADMIN"])
	@Field(() => Status, { nullable: true })
	status?: Status;

	@Field(() => [SubmissionInputTranslation])
	@ArrayMinSize(1, { message: "You must include a translation!" })
	translations: SubmissionInputTranslation[];
}
