import { prop as Property } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { ObjectId } from "mongodb";

import { User } from "./Attendee";
import { Conference } from "./Conference";
import { Ref } from "../util/types";
import { Section } from "./Section";

enum Status {
	Accepted = "ACCEPTED",
	Rejected = "REJECTED",
	Reviewing = "REVIEWING",
}

registerEnumType(Status, {
	name: "Status", // this one is mandatory
	description: "The submissions's review process status", // this one is optional
});

@ObjectType({ description: "Submission entity model type" })
export class Submission extends TimeStamps {
	@Field(() => ID)
	id: ObjectId;

	@Field()
	@Property()
	name: string;

	@Field()
	@Property()
	abstract: string;

	@Field(() => [String])
	@Property({ type: () => [String] })
	keywords: string[];

	@Field({ nullable: true })
	@Property()
	submissionUrl?: string;

	@Field(() => Conference)
	@Property({ ref: () => Conference })
	conference: Ref<Conference>;

	@Field(() => Section)
	@Property({ ref: () => Section })
	section: Ref<Section>;

	@Field(() => [User])
	@Property({ type: () => [User] })
	authors: User[];

	@Field(() => Status)
	@Property({ default: "REVIEWING" })
	status: Status;

	@Field()
	createdAt: Date;
	@Field()
	updatedAt: Date;
}
