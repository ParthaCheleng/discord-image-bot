import { Message } from "discord.js";
import uploadToCloud from '../utils/cloudUpload';

const handleUploadCommand = async (message:Message) => {
    if (message.author.bot) return;

    const attachment = message.attachments.first();
    if(!attachment || !attachment.contentType?.startsWith('image/')){
        await message.reply('❌ Please upload a valid image with the `!upload` command.');
        return;
    }

    try{
        const imageUrl = attachment.url;
        const uploadUrl = await uploadToCloud(imageUrl);
        await message.reply(`✅ Image uploaded successfully: ${uploadedUrl}`);
    } catch(err){
        console.error(err);
        await message.reply('⚠️ Upload failed. Try again later.');
    }
};

export default handleUploadCommand;