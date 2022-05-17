import { Field, ObjectType, ArgsType, Int, InputType } from "type-graphql";
import { Min, Max } from "class-validator";
import { ObjectId } from "mongodb";

import { Attendee } from "../../entitites/Attendee";
import CreateConnection from "./pagination";
import { RefDocExists } from "../../util/validation";
import { Conference } from "../../entitites/Conference";

@ObjectType({
	description: "UserConnection type enabling cursor based pagination",
})
export class AttendeeConnection extends CreateConnection(Attendee) {}

@ArgsType()
export class AttendeeArgs {
	@Field(() => String, { nullable: true })
	@RefDocExists(Attendee, {
		message: "Cursor's document not found!",
	})
	after?: ObjectId;

	@Field(() => Int, { defaultValue: 20, nullable: true })
	@Min(1)
	@Max(50)
	first?: number;

	@Field(() => String, { nullable: true })
	@RefDocExists(Attendee, {
		message: "Cursor's document not found!",
	})
	before?: ObjectId;

	@Field(() => Int, { defaultValue: 20, nullable: true })
	@Min(1)
	@Max(50)
	last?: number;
}

@InputType({ description: "Attendee input type" })
export class AttendeeInput {
	@RefDocExists(Conference, { message: "Conference not found!" })
	conference: ObjectId;
}
