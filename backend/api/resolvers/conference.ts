import { Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { Conference } from "../entitites/Conference";
import { CRUDservice } from "../services/CRUDservice";

@Service()
@Resolver(() =>Conference)
export class ConferenceResolver {
    constructor(private readonly conferenceService = new CRUDservice(Conference)) {}

    @Query(()=> [Conference])
    async conferences(): Promise<Conference[]> {
        return await this.conferenceService.findAll({})
    }

    @Mutation(()=> Conference)
    async createConference():Promise<Conference> {
        return await this.conferenceService.create({name: "BPF 2022"})
    }
} 