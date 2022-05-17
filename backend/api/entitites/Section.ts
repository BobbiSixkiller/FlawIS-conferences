import { prop as Property } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { ObjectId } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import { Ref } from "../util/types";
import { Conference } from "./Conference";
import { Submission } from "./Submission";

@ObjectType({ description: "Conference's section entity model type" })
export class Section extends TimeStamps {
	@Field(() => ID)
	id: ObjectId;

	@Field(() => Conference)
	@Property({ ref: () => Conference })
	conference: Ref<Conference>;

	@Field()
	@Property()
	name: string;

	@Field()
	@Property()
	abstract: string;

	@Field()
	@Property()
	description: string;

	@Field(() => [Submission])
	submissions: Submission[];

	@Field()
	createdAt: Date;
	@Field()
	updatedAt: Date;
}
