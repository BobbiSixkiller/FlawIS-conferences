import { ObjectId } from "mongodb";

export type Ref<T> = T | ObjectId;

export type User = {
	id: ObjectId
	email: string
	role:string
	permissions: string[]
}
