import { Message } from "discord.js";
import uploadToCloud from '../utils/cloudUpload';

const handleUploadCommand = async (message:Message) => {
    if (message.author.bot) return;

    // To get only multiple image attatchments

    const imageAttatchments = message.attachments.filter(
        (attachment) => attachment.contentType?.startsWith('image/')
    );

    if (imageAttatchments.size==0){
        await message.reply('Please upload one or more valid images with the `!upload` command.');
        return;
    }

    try{
        // upload all the images
        const uploadPromises = imageAttatchments.map(async (attachment) =>{
            return await uploadToCloud(attachment.url);
        });
    
        const uploadedUrls = await Promise.all(uploadPromises);

        const response = `${uploadedUrls.length} image(s) uploaded successfully:\n` +
        uploadedUrls.map((url) => `${url}`).join('\n');

        await message.reply(response);
    }catch (err){
        console.error(err);
        await message.reply('One or more uploads failed. Try again later.');
    }
};

export default handleUploadCommand;