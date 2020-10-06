const { prefix } = require("../config.json");

module.exports = {
	name: 'help',
	aliases: ["h"],
	description: 'help for all commands',
	execute(msg, args) {
		const send = {
			color: 0x0099ff,
			title: `指令查詢`,
			fields: [
				{
					name: `目前prefix: ${prefix}`,
					value: `\u200b`,
				},
				{
					name: 'h!player',
					value: '玩家查詢',
				},
				{
					name: 'h!invite',
					value: '邀請機器人',
				},
				{
					name: 'h!skywars',
					value: 'SkyWars玩家資料查詢',
				},
			],
			timestamp: new Date(),
			footer: {
				text: 'Bot Made By X̷͑̔i҈͊̿̆ń̶̅g̸͋̄Y҉̈͑̏a҉̐́̌n̶͑̂#7237',
				icon_url: 'https://cdn.discordapp.com/avatars/254856124820488192/c461be67ce2b664e7039fa3c4fc0c854.png?size=128',
			},
		};

		msg.channel.send({ embed: send });
	},
};
