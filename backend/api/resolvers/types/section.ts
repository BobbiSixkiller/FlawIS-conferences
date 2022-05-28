import { Field, InputType } from "type-graphql";
import { IsLocale, IsString } from "class-validator";
import { ObjectId } from "mongodb";

import { Language, Section, Translation } from "../../entitites/Section";

@InputType({ description: "Language input" })
class LanguageInput implements Language {
	@Field()
	@IsLocale()
	code: string;
}

@InputType()
class TranslationInput implements Translation {
	@Field()
	language: string;

	@Field()
	name: string;

	@Field()
	description: string;
}

@InputType({ description: "Conference section input type" })
export class SectionInput implements Partial<Section> {
	@Field()
	@IsString()
	name: string;

	@Field()
	@IsString()
	description: string;

	@Field(() => [TranslationInput])
	translations: TranslationInput[];

	@Field(() => [LanguageInput])
	languages: LanguageInput[];

	@Field(() => String)
	@IsString()
	conference: ObjectId;
}
