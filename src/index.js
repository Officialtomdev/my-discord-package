async function spoof(options = {}) {
    if (!options.message) throw new TypeError("You must input a valid message!");
    if (!options.channel) throw new TypeError("You must input a valid channel!");
    if (!options.member) throw new TypeError("You must input a valid member!");

    try {
        const webhook = await options.channel.createWebhook({
            name: options.member.user.username,
            avatar: options.member.user.avatarURL(),
            channel: options.channel
        });

        await webhook.send(options.message);

        const del = await options.channel.guild.fetchWebhooks();
        await Promise.all(del.map(async web => {
            if (web.token !== webhook.token || web.id !== webhook.id) return;
            else {
                await web.delete();
            }
        }))
    } catch (err) {
        throw new TypeError(err);
    }
    
}
 
module.exports = { spoof }