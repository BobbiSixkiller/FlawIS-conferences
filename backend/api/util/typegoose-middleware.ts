import { Model, Document } from "mongoose";
import { getClassForDocument } from "@typegoose/typegoose";
import { MiddlewareFn } from "type-graphql";
import { Translation } from "../entitites/Section";
import { Context } from "./auth";

export const TypegooseMiddleware: MiddlewareFn = async ({ context }, next) => {
	const result = await next();

	const { locale } = context as Context;

	if (Array.isArray(result)) {
		return result.map((item) =>
			item instanceof Model ? convertDocument(item, locale) : item
		);
	}

	if (result instanceof Model) {
		return convertDocument(result, locale);
	}

	return result;
};

function transformIds(doc: object) {
	const transformed = [];

	for (let [key, value] of Object.entries(doc)) {
		if (key === "_id") key = "id";

		if (typeof value === "object" && value?.hasOwnProperty("_id")) {
			value = transformIds(value);
		}

		if (typeof value === "object" && Array.isArray(value)) {
			value = value.map((v) => transformIds(v));
		}

		transformed.push([key, value]);
	}

	return Object.fromEntries(transformed);
}

//localization of returned document as well as input data transformation to ensure that all localizations are inside translation array and english is the default language of the data
export function localize(data: any, locale: string): any {
	if (locale !== "en" && data.translations) {
		//check if UI's (context) locale is set to mongo's default language - english
		const translation = data.translations.find(
			//find translation
			(t: Translation) => t.language === locale
		);
		if (translation) {
			for (const [key, value] of Object.entries(translation)) {
				//transform the data based on context locale
				const temp = data[key];

				data[key] = value;
				translation[key] = temp;
			}

			translation.language = "en";
		} else {
			//if context locale translation is not found (new data is being submitted), find mandatory english translation and transform to unified document format
			const english = data.translations.find(
				(t: Translation) => t.language === "en"
			);

			for (const [key, value] of Object.entries(english)) {
				const temp = data[key];

				data[key] = value;
				english[key] = temp;
			}

			english.language = locale;
		}

		return data;
	} else return data;
}

function convertDocument(doc: Document, locale: string) {
	const convertedDocument = transformIds(doc.toObject());
	localize(convertedDocument, locale);
	const DocumentClass = getClassForDocument(doc)!;
	Object.setPrototypeOf(convertedDocument, DocumentClass.prototype);
	return convertedDocument;
}
