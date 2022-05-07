import { ObjectId } from "mongodb";
import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { Service } from "typedi";
import { Attendee } from "../entitites/Attendee";
import { Conference } from "../entitites/Conference";
import { CRUDservice } from "../services/CRUDservice";
import { Context } from "../util/auth";

@Service()
@Resolver(() => Attendee)
export class AttendeeResolver {
    constructor(private readonly attendeeService = new CRUDservice(Attendee),private readonly conferenceService= new CRUDservice(Conference)) {}

    @Query(() => [Attendee])
    async attendees(): Promise<Attendee[]> {
        return await this.attendeeService.findAll({})
    }

    @Mutation(() => Attendee)
    async addAttendee(@Arg("conferenceId")conferenceId: ObjectId, @Ctx() {user}:Context): Promise<Attendee> {
        console.log(user?.id)
            return await this.attendeeService.create({conference: conferenceId, user: {id:user?.id}})
    }

    @FieldResolver(() => Conference, {nullable: true})
    async conference(@Root() {conference}: Attendee): Promise<Conference | null>{
        return await this.conferenceService.findOne({_id: conference})
    }
}