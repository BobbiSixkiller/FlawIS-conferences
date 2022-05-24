import {
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from "class-validator";
import { getModelForClass } from "@typegoose/typegoose";
import { createParamDecorator } from "type-graphql";
import { Conference } from "../entitites/Conference";
import { UserInputError } from "apollo-server";

@ValidatorConstraint({ name: "RefDoc", async: true })
class RefDocValidator implements ValidatorConstraintInterface {
	async validate(refId: string, args: ValidationArguments) {
		const modelClass = args.constraints[0];
		return await getModelForClass(modelClass).exists({ _id: refId });
	}

	defaultMessage(): string {
		return "Referenced Document not found!";
	}
}

export function RefDocExists(
	modelClass: any,
	validationOptions?: ValidationOptions
) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: "RefDocExists",
			target: object.constructor,
			propertyName: propertyName,
			constraints: [modelClass],
			options: validationOptions,
			validator: RefDocValidator,
		});
	};
}

export function CheckTicket(): ParameterDecorator {
	return createParamDecorator(async ({ args }) => {
		const conference = await getModelForClass(Conference).findOne({
			_id: args.data.conferenceId,
		});
		if (!conference) throw new UserInputError("Conference not found!");

		const ticket = conference.tickets.find(
			(t) => t.id.toString() === args.data.ticketId.toString()
		);
		if (!ticket) throw new UserInputError("Invalid ticket!");

		return ticket;
	});
}
