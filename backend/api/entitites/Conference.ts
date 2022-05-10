import { Field, ID, ObjectType } from "type-graphql";
import { prop as Property } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

import { ObjectId } from "mongodb";
import { Directive } from "type-graphql";

@ObjectType({ description: "Conference model type" })
@Directive('@key(fields: "id")')
export class Conference extends TimeStamps {
	@Field(() => ID)
	id: ObjectId;

	@Field()
	@Property()
	name: string;

	@Field()
	createdAt: Date;
	@Field()
	updatedAt: Date;
}
