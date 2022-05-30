import { Field, Int, ObjectType } from "type-graphql";
import { prop as Property } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

import { ObjectId } from "mongodb";
import { Section, Translation } from "./Section";
import { Attendee } from "./Attendee";

@ObjectType()
class TicketTranslation extends Translation implements Partial<Ticket> {
	@Field()
	@Property()
	name: string;

	@Field()
	@Property()
	description: string;
}

@ObjectType()
class ConferenceTranslation extends Translation {
	@Field()
	@Property()
	name: string;

	@Field()
	@Property()
	description: string;

	@Field()
	@Property()
	logoUrl: string;

	@Field(() => [TicketTranslation])
	@Property({ type: () => TicketTranslation, default: [], _id: false })
	tickets: TicketTranslation[];
}

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
	@Field({ nullable: true })
	id?: ObjectId;

	@Field()
	@Property()
	name: string;

	@Field()
	@Property()
	ICO: string;

	@Field()
	@Property()
	DIC: string;

	@Field()
	@Property()
	ICDPH: string;

	@Field({ nullable: true })
	@Property()
	IBAN?: string;

	@Field({ nullable: true })
	@Property()
	SWIFT?: string;

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
	@Field()
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
	@Field()
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

	@Field()
	@Property()
	variableSymbol: string;

	@Field(() => Host, { nullable: true })
	@Property({ _id: false })
	host?: Host;

	@Field(() => Venue, { nullable: true })
	@Property({ _id: false })
	venue?: Venue;

	@Field(() => [Section])
	sections: Section[];

	@Field(() => [Ticket])
	@Property({ type: () => Ticket, default: [] })
	tickets: Ticket[];

	@Field({ nullable: true })
	@Property()
	regStart?: Date;

	@Field({ nullable: true })
	@Property()
	start?: Date;

	@Field({ nullable: true })
	@Property()
	end?: Date;

	@Field(() => [Attendee])
	attendees: Attendee[];

	@Field(() => [ConferenceTranslation])
	@Property({ type: () => ConferenceTranslation, default: [], _id: false })
	translations: ConferenceTranslation[];

	@Field()
	createdAt: Date;
	@Field()
	updatedAt: Date;
}
