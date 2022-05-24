import { prop as Property } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { ObjectId } from "mongodb";
import { Field, Int, ObjectType } from "type-graphql";

import { Billing, Host } from "./Conference";

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
export class Invoice extends TimeStamps {
	@Field(() => Billing)
	@Property({ type: () => Billing, _id: false })
	payer: Billing;

	@Field(() => Host)
	@Property({ type: () => Host, _id: false })
	issuer: Host;

	@Field(() => InvoiceData)
	@Property({ type: () => InvoiceData, _id: false })
	invoice: InvoiceData;

	@Property()
	conference: ObjectId;

	@Property()
	user: ObjectId;
}
