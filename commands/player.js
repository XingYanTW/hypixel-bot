const {Hypixel, Mojang} = require('hypixel-node');
const hypixel = new Hypixel('3593184b-0fd1-4c65-9bba-ba1d2f5a67f1');
const mojang = new Mojang();
const fetch = require("node-fetch");
const { block_id } = require("../blockid.json");

module.exports = {
	name: 'player',
	aliases: ["p"],
	description: 'hypixel player info',
	async execute(msg, args) {
		msg.channel.startTyping();
		let searcher = args[0];

		if (searcher === block_id) {
			msg.reply("無法查詢此玩家ID");
			msg.channel.stopTyping();
			return;
		};

		if (!searcher) {
			msg.reply("請輸入玩家名稱");
			msg.channel.stopTyping();
			return;
		};

		if (searcher.length > 16) {
			msg.reply("尚未找到此玩家");
			msg.channel.stopTyping();
			return;
		} else if (searcher.length < 3) {
			msg.reply("尚未找到此玩家");
			msg.channel.stopTyping();
			return;	
		};
		
		const { id } = await fetch(`https://api.mojang.com/users/profiles/minecraft/${searcher}`).then(response => response.json());
		const { name } = await fetch(`https://api.mojang.com/users/profiles/minecraft/${searcher}`).then(response => response.json());

		const { player } = await fetch(`https://api.hypixel.net/player?uuid=${id}&key=3593184b-0fd1-4c65-9bba-ba1d2f5a67f1`).then(response => response.json());

		const firstjoin = new Date(player.firstLogin);

		let info = await hypixel.getPlayer(name);
		
		const send = {
			color: info.getRankColor(),
			title: `${name}的資料`,
			fields: [
				{
					name: `ID: ${info.getRank(false)}${name}`,
					value: `UUID: ${id}`,
				},
				{
					name: '\u200b',
					value: '\u200b',
					inline: false,
				},
				{
					name: 'RANK',
					value: `${info.getRank()}`,
					inline: true,
				},
				{
					name: '等級',
					value: `${info.getLevel()}`,
					inline: true,
				},
				{
					name: '首次上線時間',
					value: `${firstjoin.toLocaleString()}`,
				}
			],
			image: {
				url: `https://visage.surgeplay.com/full/512/${id}`,
			},
			timestamp: new Date(),
			footer: {
				text: 'Bot Made By X̷͑̔i҈͊̿̆ń̶̅g̸͋̄Y҉̈͑̏a҉̐́̌n̶͑̂#7237',
				icon_url: 'https://cdn.discordapp.com/avatars/254856124820488192/c461be67ce2b664e7039fa3c4fc0c854.png?size=128',
			},
		};

		msg.channel.send({ embed: send });
		msg.channel.stopTyping();
	},
};