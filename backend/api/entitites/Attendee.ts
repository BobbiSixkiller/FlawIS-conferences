import { prop as Property} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { ObjectId } from "mongodb";
import { Directive, Field, ID, ObjectType } from "type-graphql";
import { Ref } from "../util/types";
import { Conference } from "./Conference";

@Directive("@extends")
@Directive(`@key(fields: "id")`)
@ObjectType({description: "User reference type from users microservice"})
export class User {
    @Directive("@external")
    @Field(()=>ID)
    id: ObjectId
}

@Directive(`@key(fields: "id")`)
@ObjectType({description: "Attendee model type"})
export class Attendee extends TimeStamps {
    @Field(()=> ID)
    id: ObjectId

    @Field(() => Conference)
    @Property({ref: () => Conference})
    conference: Ref<Conference>

    @Field(() => User)
    @Property({ref:()=> User})
    user: Ref<User>

    @Field()
    createdAt: Date
    @Field()
    updatedAt: Date
}