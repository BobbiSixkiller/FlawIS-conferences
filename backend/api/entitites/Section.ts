import { prop as Property } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { ObjectId } from "mongodb";
import { Field, ObjectType } from "type-graphql";

import { Ref } from "../util/types";
import { Conference } from "./Conference";
import { Submission } from "./Submission";

@ObjectType({ description: "Language code" })
export class Language {
	@Field()
	@Property()
	code: string;
}

@ObjectType()
export class Translation {
	@Field()
	@Property()
	language: string;

	@Field()
	@Property()
	name: string;

	@Field()
	@Property()
	description: string;
}

@ObjectType({ description: "Conference's section entity model type" })
export class Section extends TimeStamps {
	@Field()
	id: ObjectId;

	@Field(() => String)
	@Property({ ref: () => Conference })
	conference: Ref<Conference>;

	@Field()
	@Property()
	name: string;

	@Field()
	@Property()
	description: string;

	@Field(() => [Translation])
	@Property({ type: () => Translation, _id: false })
	translations: Translation[];

	@Field(() => [Language])
	@Property({ type: () => [Language], _id: false })
	languages: Language[];

	@Field(() => [Submission])
	submissions: Submission[];

	@Field()
	createdAt: Date;
	@Field()
	updatedAt: Date;
}
