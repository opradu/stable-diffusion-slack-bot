const { App } = require("@slack/bolt");
const { WebClient } = require("@slack/web-api");
const { LogLevel } = require("@slack/logger");
const fs = require("fs");
const path = require("path");

const tdInvokeCli = require('./tdInvokeCli.js');


require("dotenv").config();
const botToken = process.env.SLACK_BOT_TOKEN;

const app = new App({
    token: botToken,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
    logLevel: LogLevel.ERROR
});




let invokeCli = new tdInvokeCli();
invokeCli.setInvokeAiBatPath(process.env.INVOKE_BAT_PATH);

invokeCli.onMessage = function (taskId, messageType, messageString) {
    console.log ("onMessage", taskId, messageType, messageString);
}

invokeCli.onProgress = function(taskId, newProgress, payload) {
    if (newProgress === 10) {
        payload.client.reactions.add({
            channel: payload.event.channel,
            name: "one",
            timestamp: payload.event.ts,
        });
    }
    if (newProgress === 20) {
        payload.client.reactions.add({
            channel: payload.event.channel,
            name: "two",
            timestamp: payload.event.ts,
        });
    }
    if (newProgress === 40) {
        payload.client.reactions.add({
            channel: payload.event.channel,
            name: "three",
            timestamp: payload.event.ts,
        });
    }
    if (newProgress === 40) {
        payload.client.reactions.add({
            channel: payload.event.channel,
            name: "four",
            timestamp: payload.event.ts,
        });
    }
    if (newProgress === 50) {
        payload.client.reactions.add({
            channel: payload.event.channel,
            name: "five",
            timestamp: payload.event.ts,
        });
    }
    if (newProgress === 60) {
        payload.client.reactions.add({
            channel: payload.event.channel,
            name: "six",
            timestamp: payload.event.ts,
        });
    }
    if (newProgress === 70) {
        payload.client.reactions.add({
            channel: payload.event.channel,
            name: "seven",
            timestamp: payload.event.ts,
        });
    }
    if (newProgress === 80) {
        payload.client.reactions.add({
            channel: payload.event.channel,
            name: "eight",
            timestamp: payload.event.ts,
        });
    }
    if (newProgress === 90) {
        payload.client.reactions.add({
            channel: payload.event.channel,
            name: "nine",
            timestamp: payload.event.ts,
        });
    }



}

invokeCli.onImageReady = function (taskId, imgPath, payload) {
    console.log("onImageReady", taskId, imgPath);

    // Read images from a specific directory (change to your desired directory)
    //const imagePath = "Z:\\invokeai\\outputs\\000141.1919622428.png";

    // Upload the image to Slack
    const fileStream = fs.createReadStream(imgPath);
    const webClient = new WebClient(botToken);
    const result = webClient.files.upload({
        channels: payload.event.channel,
        file: fileStream,
        initial_comment: payload.originalMessage

    });



    // React to the message with a checkmark
    payload.client.reactions.add({
        channel: payload.event.channel,
        name: "heavy_check_mark",
        timestamp: payload.event.ts,
    });


    //Send the original message along with the image
    payload.client.chat.postMessage({
        channel: payload.event.channel,
        text: `Your picture for: "${payload.originalMessage}" is ready!`,
        thread_ts: payload.event.ts, // This will post the message as a reply in the thread
    });

}

invokeCli.start();




// Handler for app mention events
app.event("app_mention", async ({ event, client }) => {
    try {
        // eyes
        await client.reactions.add({
            channel: event.channel,
            name: "eyes",
            timestamp: event.ts,
        });





        // Get the original message text by removing the bot mention
        const originalMessage = event.text.replace(/<@.*?>/g, '').trim();

        //invokeCli.text2img("1", originalMessage + " -U 2 0.75 -ft gfpgan -W 512 -H 512", {
        invokeCli.text2img("1", originalMessage + " -U 2 0.75 -ft gfpgan -W 512 -H 512 -s70", {
            client: client,
            event: event,
            originalMessage: originalMessage
        });






    } catch (error) {
        console.error("Error:", error);
    }
});

(async () => {
    // Start your app
    await app.start();
    console.log("⚡️ Bolt app is running!");
})();