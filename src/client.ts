import { Client, GatewayIntentBits } from 'discord.js';


export const client = new Clientlient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});