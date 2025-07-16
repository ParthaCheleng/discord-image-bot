import { config } from "dotenv";
import { client } from './client';
import handleUploadCommand from './commands/uploadImage';
import { Message } from "discord.js";

config();

client.once('ready', ()=>{
    console.log(`Logged in as ${client.user?.tag}`);
});

client.on('messageCreate', async  (message: Message) => {
    if (message.content.startsWith('!upload')){
        await handleUploadCommand(message);
    }
});

client.login(process.env.DISCORD_TOKEN);