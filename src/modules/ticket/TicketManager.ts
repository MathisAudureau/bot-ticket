import {CacheType, CommandInteraction, Interaction, MessageActionRow} from "discord.js";
import {errorEmbedFunction, sendEmbedInTicket, successEmbedFunction, ticketEmbed} from "App/data/embeds";
import {createTicketButton, functionCreateButton} from "App/data/buttons";

const config = require('../../config.json')

export class TicketManager {

    public static async systemIsReady(interaction: CommandInteraction) {
        await interaction.reply({
            embeds: [successEmbedFunction("Système bien mis en place", "Développé par Mathis Audureau")],
            ephemeral: true
        });
    }

    public static async systemSetup(interaction: CommandInteraction) {
        const row: MessageActionRow = new MessageActionRow()
            .addComponents(createTicketButton);

        await interaction.channel!.send({
            embeds: [ticketEmbed],
            components: [row]
        });
    }

    public static async createTicket(interaction: Interaction) {
        if (!interaction.isButton()) return
        if (interaction.customId === 'createticket') {
            await this.ticketCreationConfirm(interaction)
            await this.ticketCreation(interaction);
        }
    }

    public static async ticketDelete(interaction: Interaction<CacheType>) {
        if (!interaction.isButton()) return;
        if (interaction.customId == "deleteticket") {
            await interaction.reply({
                embeds: [errorEmbedFunction("Votre ticket sera supprimé dans 5 secondes...", "Développé par Mathis Audureau")]
            });
            setTimeout(deleteTicket, 5000);
        }

        async function deleteTicket() {
            await interaction.channel!.delete();
        }
    }

    private static async ticketCreationConfirm(interaction: Interaction) {
        if (!interaction.isButton()) return
        await interaction.reply({
            embeds: [successEmbedFunction("Votre ticket a bien été créé.", "Développé par Mathis Audureau")],
            ephemeral: true
        })
    }

    private static async ticketCreation(interaction: Interaction) {
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
}