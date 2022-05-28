import "reflect-metadata";
import Container from "typedi";
import { ApolloServer } from "apollo-server";
import { connect } from "mongoose";

import { ObjectId } from "mongodb";
import { ObjectIdScalar } from "./util/scalars";
import { TypegooseMiddleware } from "./util/typegoose-middleware";

import { ConferenceResolver } from "./resolvers/conference";

import { buildFederatedSchema } from "./util/buildFederatedSchema";

import { Context } from "./util/auth";
import { authChecker } from "./util/auth";

import { AttendeeResolver } from "./resolvers/attendee";
import { SectionResolver } from "./resolvers/section";
import { SubmissionResolver } from "./resolvers/submission";

import env from "dotenv";

env.config();

async function main() {
	//Build schema
	const schema = await buildFederatedSchema({
		resolvers: [
			ConferenceResolver,
			SectionResolver,
			SubmissionResolver,
			AttendeeResolver,
		],
		// use document converting middleware
		globalMiddlewares: [TypegooseMiddleware],
		// use ObjectId scalar mapping
		scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
		emitSchemaFile: true,
		container: Container,
		//disabled validation for dev purposes
		//validate: false,
		authChecker,
	});

	//Create Apollo server
	const server = new ApolloServer({
		schema,
		context: ({ req, res, user }: Context) => ({
			req,
			res,
			user: req.headers.user ? JSON.parse(req.headers.user as string) : null,
			locale: "en",
		}),
	});

	// create mongoose connection
	const mongoose = await connect(
		process.env.DB_DEV_ATLAS || "mongodb://localhost:27017/test"
	);
	console.log(mongoose.connection && "Database connected!");

	await server.listen({ port: process.env.PORT || 5003 }, () =>
		console.log(
			`🚀 Server ready and listening at ==> http://localhost:${
				process.env.PORT || 5003
			}${server.graphqlPath}`
		)
	);
}

main().catch((error) => {
	console.log(error, "error");
});
