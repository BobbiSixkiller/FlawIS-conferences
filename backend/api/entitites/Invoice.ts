import { prop as Property } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { ObjectId } from "mongodb";
import { Field, ID, ObjectType } from "type-graphql";

import { Ref } from "../util/types";
import { Conference } from "./Conference";

class Payer {}

class Issuer {}

class InvoiceData {}

@ObjectType({ description: "Invoice entity model type" })
export class Invoice extends TimeStamps {
	@Field(() => ID)
	id: ObjectId;

	payer: Payer;

	issuer: Issuer;

	invoice: InvoiceData;

	@Property({ ref: () => Conference })
	conference: Ref<Conference>;
}
