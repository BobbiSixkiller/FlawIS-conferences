import { prop as Property } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { ObjectId } from "mongodb";
import { Field, ID, Int, ObjectType } from "type-graphql";

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

@ObjectType({ description: "Invoice entity model type" })
export class Invoice extends TimeStamps {
	@Field(() => ID)
	id: ObjectId;

	@Field(() => Billing)
	@Property({ _id: false })
	payer: Billing;

	@Field(() => Host)
	@Property({ _id: false })
	issuer: Host;

	@Field(() => InvoiceData)
	@Property({ _id: false })
	invoice: InvoiceData;

	@Property()
	conference: ObjectId;

	@Property()
	user: ObjectId;
}
