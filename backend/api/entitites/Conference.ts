import { Field, ID, ObjectType } from "type-graphql";
import { prop as Property } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

import { ObjectId } from "mongodb";
import { Directive } from "type-graphql";
import { Section } from "./Section";

@ObjectType()
export class Address {
	@Field()
	@Property()
	street: string;

	@Field()
	@Property()
	city: string;

	@Field()
	@Property()
	postal: string;

	@Field()
	@Property()
	country: string;
}

@ObjectType({ description: "Conference hosting organization's billing information" })
export class Billing {
	@Field()
	@Property()
	name: string;

	@Field({ nullable: true })
	@Property()
	ICO?: string;

	@Field({ nullable: true })
	@Property()
	DIC?: string;

	@Field({ nullable: true })
	@Property()
	ICDPH?: string;

	@Field(() => Address)
	@Property({_id: false})
	address: Address;
}

@ObjectType({description: "Conference hosting organization"})
class Host {
	@Field()
	@Property()
	logoUrl: string;

	@Field()
	@Property()
	stampUrl: string;

	@Field(() => Billing)
	@Property({_id: false})
	billing: Billing;
}


@ObjectType({description: "Venue that conference takes place in"})
class Venue {
	@Field()
	@Property()
	name: string;

	@Field()
	@Property({_id: false})
	address: Address;
}

@ObjectType({ description: "Conference model type" })
@Directive('@key(fields: "id")')
export class Conference extends TimeStamps {
	@Field(() => ID)
	id: ObjectId;

	@Field()
	@Property()
	name: string;

	@Field()
	@Property()
	logoUrl: string;

	@Field()
	@Property()
	description: string;

	@Field(() => Host)
	@Property({_id: false})
	host: Host;

	@Field(() => Venue)
	@Property({_id: false})
	venue: Venue;

	@Field(()=>[Section])
	sections: Section[]

	@Field()
	createdAt: Date;
	@Field()
	updatedAt: Date;
}
