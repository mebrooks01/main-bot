import Discord from "discord.js"
import Client from "../Client"
import GuildMember from "./GuildMember"
import GuildMemberManager from "./GuildMemberManager"
import Role from "./Role"

export default class Guild extends Discord.Guild {
    client: Client
    members: GuildMemberManager

    member(user: Discord.UserResolvable): GuildMember {
        return super.member(user) as GuildMember
    }

    role(name: string): Role {
        return this.roles.cache.find(role => role.name === name) as Role
    }

    async setVanityCode(code: string, reason?: string): Promise<void> {
        // @ts-ignore
        await this.client.api
            // @ts-ignore
            .guilds(this.id, "vanity-url")
            .patch({ data: { code }, reason })
    }
}
