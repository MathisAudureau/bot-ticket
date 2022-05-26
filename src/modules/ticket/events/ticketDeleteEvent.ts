import {Event, BaseEvent} from 'ioc:factory/Core/Event'
import {Interaction} from 'discord.js'
import {errorEmbedFunction} from "App/data/embeds";

@Event('interactionCreate')
export default class TicketDeleteEvent extends BaseEvent {
    public async run(interaction: Interaction): Promise<void> {
        if(!interaction.isButton()) return;
        if(interaction.customId == "deleteticket") {
            await interaction.reply({
                embeds: [errorEmbedFunction("Votre ticket sera supprimé dans 5 secondes...", "Développé par Mathis Audureau")]
            });
            setTimeout(deleteTicket, 5000);
        }
        async function deleteTicket() {
            await interaction.channel!.delete();
        }
    }
}