import { Field, InputType, Int } from "type-graphql";
import {
	IsBoolean,
	IsDate,
	IsNumberString,
	IsString,
	Length,
} from "class-validator";

import {
	Address,
	Billing,
	Host,
	Ticket,
	Venue,
} from "../../entitites/Conference";

@InputType()
class AddressInput implements Address {
	@Field()
	@Length(1, 100, { message: "Street must be 1-100 characters long!" })
	street: string;

	@Field()
	@Length(1, 100, { message: "City must be 1-100 characters long!" })
	city: string;

	@Field()
	@Length(1, 20, { message: "Postal code be 1-20 characters long!" })
	postal: string;

	@Field()
	@Length(1, 50, { message: "Country name be 1-50 characters long!" })
	country: string;
}

@InputType()
export class BillingInput implements Billing {
	@Field()
	@Length(1, 100, { message: "Name must be 1-100 characters long!" })
	name: string;

	@Field(() => AddressInput)
	address: AddressInput;

	@Field({ nullable: true })
	DIC?: string;

	@Field({ nullable: true })
	ICDPH?: string;

	@Field({ nullable: true })
	ICO?: string;
}

@InputType()
export class HostInput implements Partial<Host> {
	@Field()
	@IsString()
	logoUrl: string;

	@Field()
	@IsString()
	stampUrl: string;

	@Field(() => BillingInput)
	billing: BillingInput;
}

@InputType()
export class VenueInput implements Partial<Venue> {
	@Field()
	@Length(1, 100, { message: "Name must be 1-100 characters long!" })
	name: string;

	@Field(() => AddressInput)
	address: AddressInput;
}

@InputType()
export class TicketInput implements Partial<Ticket> {
	@Field()
	@Length(1, 100, { message: "Name must be 1-100 characters long!" })
	name: string;

	@Field()
	@Length(1, 100, { message: "Name must be 1-300 characters long!" })
	description: string;

	@Field()
	@IsBoolean()
	online: boolean;

	@Field()
	@IsBoolean()
	withSubmission: boolean;

	@Field(() => Int)
	@IsNumberString()
	price: number;
}

@InputType()
export class ConferenceInput {
	@Field()
	@Length(1, 100, { message: "Name must be 1-100 characters long!" })
	name: string;

	@Field()
	@IsString()
	description: string;

	@Field()
	@IsString()
	logoUrl: string;

	@Field({ nullable: true })
	@IsDate()
	regStart?: Date;

	@Field({ nullable: true })
	@IsDate()
	start?: Date;

	@Field({ nullable: true })
	@IsDate()
	end?: Date;

	@Field(() => HostInput, { nullable: true })
	host?: HostInput;

	@Field(() => VenueInput, { nullable: true })
	venue?: VenueInput;

	@Field(() => TicketInput, { nullable: true })
	tickets?: TicketInput[];
}
