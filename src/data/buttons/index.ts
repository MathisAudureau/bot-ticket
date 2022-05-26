import {MessageButton} from "discord.js";


export function functionCreateButton(label: string, id: string, style: any, emoji: string) {
    return new MessageButton({
        type: "BUTTON",
        label: label,
        customId: id,
        style: style,
        emoji: emoji
    })
}

export const createTicketButton: MessageButton = new MessageButton({
    type: "BUTTON",
    emoji: "☁",
    label: "Créer un ticket",
    customId: "createticket",
    style: "PRIMARY"
})

