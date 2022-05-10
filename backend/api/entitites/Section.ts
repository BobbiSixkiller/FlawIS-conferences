import { prop as Property } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { ObjectId } from "mongoose";
import { Field, ID } from "type-graphql";

export class Section extends TimeStamps {
	@Field(() => ID)
	id: ObjectId;

	@Field()
	@Property()
	name: string;

	@Field()
	@Property()
	abstract: string;

	@Field()
	@Property()
	description: string;

	@Field()
	createdAt?: Date | undefined;
	@Field()
	updatedAt?: Date | undefined;
}
