import {  prop as Property} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Field, ID } from "type-graphql";
import {ObjectId} from 'mongodb'

import { User } from "./Attendee"


export class Submission extends TimeStamps {
    @Field(()=> ID)
    id: ObjectId;

    @Field()
    @Property()
    name: string

    @Field()
    @Property()
    abstract: string

    @Field(() => [String])
    @Property({type: () => [String]})
    keywords: string[]

    @Field({nullable: true})
    @Property()
    submissionUrl?: string

    @Field(() => [User])
    @Property({type: () => [User]})
    authors: User[]

    @Field()
    createdAt: Date
    @Field()
    updatedAt: Date
}