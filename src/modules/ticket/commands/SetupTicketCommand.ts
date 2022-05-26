import { Command, BaseCommand } from 'ioc:factory/Core/Command'
import {CommandInteraction} from 'discord.js'
import {TicketManager} from "App/modules/ticket/TicketManager";

@Command({
  scope: 'GUILDS',
  options: {
    name: 'ticket-setup',
    description: 'Commande pour mettre en place le système de ticket',
    options: []
  }
})

export default class SetupTicketCommand extends BaseCommand {
  public async run (interaction: CommandInteraction): Promise<void> {
    await TicketManager.systemIsReady(interaction);
    await TicketManager.systemSetup(interaction);
  }
}