import {MessageEmbed} from "discord.js";
import {Colors} from "@discord-factory/colorize";
const config = require('../../config.json')

export const ticketEmbed: MessageEmbed = new MessageEmbed({
    title: "Créer un ticket",
    url: "https://github.com/mathisaudureau",
    description: "Appuyez sur le bouton ci-dessous pour créer un ticket sur ce serveur. /n Tout abus se vera sanctionné.",
    footer: {
        text: "Développé par Mathis Audureau",
        iconURL: config.embeds.icon
    },
})

export function successEmbedFunction(titre: string, footer: string) {
    return new MessageEmbed({
        title: titre,
        color: Colors.GREEN_500,
        url: "https://github.com/mathisaudureau",
        footer: {
            text: footer,
            iconURL: config.embeds.icon
        }
    })
}

export function errorEmbedFunction(titre: string, footer: string) {
    return new MessageEmbed({
        title: titre,
        color: Colors.RED_500,
        url: "https://github.com/mathisaudureau",
        footer: {
            text: footer,
            iconURL: config.embeds.icon
        }
    })
}

export function sendEmbedInTicket(footer: string, username: string) {
    return new MessageEmbed({
        title: `Ticket de ${username}`,
        description: "Un membre de notre équipe va traiter votre demande au plus vite. Pour accélerer notre travail, explique déjà votre problème.",
        url: "https://github.com/mathisaudureau",
        footer: {
            text: footer,
            iconURL: config.embeds.icon
        }
    })
}