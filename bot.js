const { Telegraf } = require("telegraf");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { pingRoleId, telegramChannelId, webhookUrl } = require("./config.json");
// const https = require("https");
// const fs = require("fs");

const bot = new Telegraf("")

// function savePhoto(photoObj, postId) {
//     const file = fs.createWriteStream(`media/${postId}_${Math.floor(Math.random() * (99999999 - 1) + 1)}.jpg`);
//     const request = https.get(photoObj.href, function(response) {
//         response.pipe(file);

//         file.on("finish", () => {
//             file.close();
//         });
//     });
// }

// function getPhotos(postId) {
//     photos = []

//     fs.readdirSync("./media/").forEach(file => {
//         if(file.startsWith(postId) != true) return; 
//         photos.push(file)
//     })

//     return photos
// }

bot.on('channel_post', (ctx) => {
    if(ctx.chat.id != telegramChannelId) return;
    if(!ctx.update.channel_post.photo) {
        postText = ctx.update.channel_post.text;
    }
    else {
        postText = ctx.update.channel_post.caption;
        // ctx.telegram.getFileLink(ctx.update.channel_post.photo[1]).then(url => savePhoto(url, ctx.update.channel_post.message_id))
    }
    // console.log(getPhotos("40"))
    var params = {
        content: `<\@\&${pingRoleId}>`,
        embeds: [
            {
                "title": "Новий пост!",
                "url": `https://t.me/${ctx.chat.username}/${ctx.update.channel_post.message_id}`,
                // "image": {
                //     "url": `attachment://`
                // },
                "color": 11482111,
                "description": postText,
                "footer": {
                    "text": "wedLE"
                }
            }
        ]
    }
    fetch(webhookUrl, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(params)
    })
    .catch((err) => {
        console.log(err)
    })
})

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
