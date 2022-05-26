import { Command, BaseCommand } from 'ioc:factory/Core/Command'
import {CommandInteraction, MessageActionRow} from 'discord.js'
import {successEmbedFunction, ticketEmbed} from "App/data/embeds";
import {createTicketButton} from "App/data/buttons";

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
    await interaction.reply({
      embeds: [successEmbedFunction("Système bien mis en place", "Développé par Mathis Audureau")],
      ephemeral: true
    });

    const row: MessageActionRow = new MessageActionRow()
        .addComponents(createTicketButton);

    await interaction.channel!.send({
      embeds: [ticketEmbed],
      components: [row]
    });
  }
}