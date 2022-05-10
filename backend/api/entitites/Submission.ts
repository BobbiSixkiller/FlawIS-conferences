import { User } from "./Attendee"


export class Submission {
    name: string

    abstract: string

    keywords: string[]

    submissionUrl?: string | null

    authors: User[]

}