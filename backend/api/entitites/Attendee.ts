import { prop as Property } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { ObjectId } from "mongodb";
import { Directive, Field, ID, ObjectType } from "type-graphql";

import { Ref } from "../util/types";

import { Conference } from "./Conference";
import { Invoice } from "./Invoice";
import { Submission } from "./Submission";

@Directive("@extends")
@Directive(`@key(fields: "id")`)
@ObjectType({ description: "User reference type from users microservice" })
export class User {
	@Directive("@external")
	@Field(() => ID)
	@Property()
	id: ObjectId;

	@Field({ nullable: true })
	@Property()
	name?: string;
}

@ObjectType({ description: "Attendee model type" })
export class Attendee extends TimeStamps {
	@Field(() => ID)
	id: ObjectId;

	@Field(() => Conference)
	@Property({ ref: () => Conference })
	conference: Ref<Conference>;

	@Field(() => User)
	@Property({ _id: false })
	user: User;

	@Field(() => Invoice)
	@Property({ ref: () => Invoice })
	invoice: Ref<Invoice>;

	@Field(() => Boolean)
	@Property({ default: false })
	withSubmission: boolean;

	@Field(() => [Submission], { nullable: true })
	@Property({ ref: () => Submission })
	submissions?: Ref<Submission>[];

	@Field()
	createdAt: Date;
	@Field()
	updatedAt: Date;
}
