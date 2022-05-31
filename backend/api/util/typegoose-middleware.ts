import { Model, Document } from "mongoose";
import { getClassForDocument } from "@typegoose/typegoose";
import { MiddlewareFn } from "type-graphql";
import { Context } from "./auth";
import { localizeOutput } from "./locale";

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

		if (
			typeof value === "object" &&
			Array.isArray(value) &&
			!value.every((i) => typeof i === "string")
		) {
			value = value.map((v) => transformIds(v));
		}

		transformed.push([key, value]);
	}

	return Object.fromEntries(transformed);
}

function convertDocument(doc: Document, locale: string) {
	const convertedDocument = transformIds(doc.toObject());
	localizeOutput(convertedDocument, convertedDocument.translations, locale);
	const DocumentClass = getClassForDocument(doc)!;
	Object.setPrototypeOf(convertedDocument, DocumentClass.prototype);
	return convertedDocument;
}
