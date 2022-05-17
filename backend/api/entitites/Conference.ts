import { Field, ID, Int, ObjectType } from "type-graphql";
import { prop as Property } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

import { ObjectId } from "mongodb";
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

@ObjectType({ description: "Billing information" })
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
	@Property({ _id: false })
	address: Address;
}

@ObjectType({ description: "Conference hosting organization" })
export class Host {
	@Field()
	@Property()
	logoUrl: string;

	@Field()
	@Property()
	stampUrl: string;

	@Field(() => Billing)
	@Property({ _id: false })
	billing: Billing;
}

@ObjectType({ description: "Venue that conference takes place in" })
export class Venue {
	@Field()
	@Property()
	name: string;

	@Field()
	@Property({ _id: false })
	address: Address;
}

@ObjectType({ description: "Conference ticket type" })
export class Ticket {
	@Field(() => ID)
	id: ObjectId;

	@Field()
	@Property()
	name: string;

	@Field()
	@Property()
	description: string;

	@Field(() => Int)
	@Property()
	price: number;

	@Field()
	@Property()
	withSubmission: boolean;

	@Field()
	@Property()
	online: boolean;
}

@ObjectType({ description: "Conference model type" })
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

	@Field(() => Host, { nullable: true })
	@Property({ _id: false })
	host?: Host;

	@Field(() => Venue, { nullable: true })
	@Property({ _id: false })
	venue?: Venue;

	@Field(() => [Section])
	sections: Section[];

	@Field(() => [Ticket])
	@Property({
		type: () => Ticket,
		default: [
			{
				name: "Active attendee",
				description: "Attendee with his/her own submission",
				price: 5000,
				withSubmission: true,
				online: false,
			},
		],
	})
	tickets: Ticket[];

	@Field({ nullable: true })
	@Property()
	regStart?: Date;

	@Field({ nullable: true })
	@Property()
	start: Date;

	@Field({ nullable: true })
	@Property()
	end: Date;

	@Field()
	createdAt: Date;
	@Field()
	updatedAt: Date;
}
