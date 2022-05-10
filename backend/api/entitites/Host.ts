import { prop as Property } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { ObjectId } from "mongodb";
import { Field, ObjectType } from "type-graphql";

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

@ObjectType({ description: "Host's billing information" })
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
	@Property()
	address: Address;
}

@ObjectType({ description: "Host entity model type" })
export class Host extends TimeStamps {
	@Field()
	id: ObjectId;

	@Field()
	@Property()
	logoUrl: string;

	@Field()
	@Property()
	stampUrl: string;

	@Field()
	@Property()
	billing: Billing;

	@Field()
	createdAt: Date;
	@Field()
	updatedAt: Date;
}
