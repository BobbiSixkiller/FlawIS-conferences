import { ObjectId } from "mongodb";
import { Field, InputType } from "type-graphql";

import { Status, Submission } from "../../entitites/Submission";

@InputType({})
class AuthorInput {
	@Field()
	id: ObjectId;
}

@InputType({ description: "Submission entity model type" })
export class SubmissionInput implements Partial<Submission> {
	@Field()
	name: string;

	@Field()
	abstract: string;

	@Field(() => [String])
	keywords: string[];

	@Field({ nullable: true })
	submissionUrl?: string;

	@Field(() => [AuthorInput])
	authors: AuthorInput[];

	@Field(() => Status)
	status: Status;
}
