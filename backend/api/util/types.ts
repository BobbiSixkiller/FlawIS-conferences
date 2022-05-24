import { ObjectId } from "mongodb";
import { Conference, Ticket } from "../entitites/Conference";

export type Ref<T> = T | ObjectId;

export type User = {
	id: ObjectId;
	name: string;
	email: string;
	role: string;
	permissions: string[];
};

export type VerifiedTicket = {
	ticket: Ticket;
	conference: Conference;
};
