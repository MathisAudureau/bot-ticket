import {Event, BaseEvent} from 'ioc:factory/Core/Event'
import {Interaction, MessageActionRow, MessageEmbed} from 'discord.js'
import {Colors} from "@discord-factory/colorize";
import {functionCreateButton} from "App/data/buttons";
import {sendEmbedInTicket, successEmbedFunction} from "App/data/embeds";

const config = require('../../../config.json')

@Event('interactionCreate')
export default class TicketCreateEvent extends BaseEvent {
    public async run(interaction: Interaction): Promise<void> {
        if (!interaction.isButton()) return

        if (interaction.customId === 'createticket') {
            await ticketCreationConfirm()
            await ticketCreation()
        }

        async function ticketCreation() {
            const ticketChannel = await interaction.guild?.channels?.create(`ticket-${interaction.member?.user.username}`, {
                type: "GUILD_TEXT",
                topic: `ticket - ${interaction.member?.user.id}`,
                parent: config.ticket.parent,
                permissionOverwrites: [
                    {
                        id: interaction.guild?.id,
                        deny: ['VIEW_CHANNEL'],
                    },
                    {
                        id: `${interaction.member?.user.id}`,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS'],
                    }
                ],
            })

            let arrow = new MessageActionRow()
                .addComponents(functionCreateButton("Supprimer le ticket", "deleteticket", "DANGER", "🗑"))

            await ticketChannel?.send({
                embeds: [sendEmbedInTicket("Développé par Mathis", interaction.member!.user.username)],
                components: [arrow]
            })
        }

        async function ticketCreationConfirm() {
            if (!interaction.isButton()) return
            await interaction.reply({
                embeds: [successEmbedFunction("Votre ticket a bien été créé.", "Développé par Mathis Audureau")],
                ephemeral: true
            })
        }
    }
}