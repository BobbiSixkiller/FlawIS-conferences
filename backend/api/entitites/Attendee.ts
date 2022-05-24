import { prop as Property } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { ObjectId } from "mongodb";
import { Directive, Field, Int, ObjectType } from "type-graphql";

import { Ref } from "../util/types";

import { Billing, Conference, Host } from "./Conference";
import { Submission } from "./Submission";

@ObjectType({ description: "The body of an invoice" })
class InvoiceData {
	@Field()
	@Property({ default: "Faktúra" })
	type: String;

	@Field()
	@Property({ default: Date.now() })
	issueDate: Date;

	@Field()
	@Property({ default: Date.now() })
	vatDate: Date;

	@Field()
	@Property({ default: new Date().setDate(new Date().getDate() + 30) })
	dueDate: Date;

	@Field()
	@Property()
	variableSymbol: String;

	@Field(() => Int)
	@Property()
	ticketPrice: Number;

	@Field(() => Int)
	@Property()
	vat: Number;

	@Field()
	@Property()
	body: String;

	@Field()
	@Property()
	comment: String;
}

@ObjectType({ description: "Invoice entity subdocument type" })
export class Invoice {
	@Field(() => Billing)
	@Property({ type: () => Billing, _id: false })
	payer: Billing;

	@Field(() => Host)
	@Property({ type: () => Host, _id: false })
	issuer: Host;

	@Field(() => InvoiceData)
	@Property({ type: () => InvoiceData, _id: false })
	body: InvoiceData;
}

@Directive("@extends")
@Directive(`@key(fields: "id")`)
@ObjectType({ description: "User reference type from users microservice" })
export class User {
	@Directive("@external")
	@Field()
	@Property()
	id: ObjectId;

	@Field({ nullable: true })
	@Property()
	withSubmission?: boolean;

	@Field({ nullable: true })
	@Property()
	online?: boolean;
}

@ObjectType({ description: "Attendee model type" })
export class Attendee extends TimeStamps {
	@Field()
	id: ObjectId;

	@Field(() => Conference)
	@Property({ ref: () => Conference })
	conference: Ref<Conference>;

	@Field(() => User)
	@Property({ _id: false })
	user: User;

	@Field(() => Invoice)
	@Property({ type: () => Invoice, _id: false })
	invoice: Invoice;

	@Field(() => [Submission])
	submissions: Submission;

	@Field()
	createdAt: Date;
	@Field()
	updatedAt: Date;
}
