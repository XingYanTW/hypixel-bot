module.exports = {
	name: 'invite',
	aliases: ["h"],
	description: 'invite me to server',
	execute(msg, args) {
		msg.reply("Use This link for invite! \n https://discord.com/api/oauth2/authorize?client_id=611854110894850049&permissions=8&scope=bot")
	},
};