import {Event, BaseEvent} from 'ioc:factory/Core/Event'
import {Interaction} from 'discord.js'
import {TicketManager} from "App/modules/ticket/TicketManager";

@Event('interactionCreate')
export default class TicketDeleteEvent extends BaseEvent {
    public async run(interaction: Interaction): Promise<void> {
        await TicketManager.ticketDelete(interaction)
    }
}