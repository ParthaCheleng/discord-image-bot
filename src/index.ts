import { config } from "dotenv";
import { client } from './client';
import handleUploadCommand from './commands/uploadImage';

config();

client.once('ready', ()=>{
    console.log(`🤖 Logged in as ${client.user?.tag}`);
});

client.on('messageCreate', async  (message) => {
    if (message.content.startsWith('!upload')){
        await handleUploadCommand(message);
    }
});

client.login(process.env.DISCORD_TOKEN);