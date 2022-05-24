import { Field, InputType } from "type-graphql";
import { IsLocale, IsString } from "class-validator";
import { ObjectId } from "mongodb";

import { Language, Section } from "../../entitites/Section";

@InputType({ description: "Language input" })
class LanguageInput implements Language {
	@Field()
	@IsLocale()
	code: string;
}

@InputType({ description: "Conference section input type" })
export class SectionInput implements Partial<Section> {
	@Field()
	@IsString()
	name: string;

	@Field()
	@IsString()
	description: string;

	@Field(() => [LanguageInput])
	languages: LanguageInput[];

	@Field(() => String)
	@IsString()
	conference: ObjectId;
}
