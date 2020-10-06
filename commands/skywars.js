const {Hypixel, Mojang} = require('hypixel-node');
const hypixel = new Hypixel('3593184b-0fd1-4c65-9bba-ba1d2f5a67f1');
const mojang = new Mojang();
const fetch = require('node-fetch');
const { block_id } = require("../blockid.json");

module.exports = {
	name: 'skywars',
	aliases: ["sw"],
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
		const xp = player.stats.SkyWars.skywars_experience;

		function getSwLevel(xp) {
    		var xps = [0, 20, 70, 150, 250, 500, 1000, 2000, 3500, 6000, 10000, 15000];
    		if(xp >= 15000) {
        		return (xp - 15000) / 10000 + 12;
    		} else {
        		for(i = 0; i < xps.length; i++) {
            	if(xp < xps[i]) {
                	return i + (xp - xps[i-1]) / (xps[i] - xps[i-1]);
            					}
        			}}};

		let info = await hypixel.getPlayer(name);

		const send = {
			color: info.getRankColor(),
			title: `${name}的SkyWars資料`,
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
					name: '等級',
					value: `${Math.floor((getSwLevel(xp)))}🌟`,
					inline: true,
				},
				{
					name: '勝利次數',
					value: `${player.stats.SkyWars.wins}👑`,
					inline: true,
				},
				{
					name: '\u200b',
					value: '\u200b',
					inline: false,
				},
				{
					name: '總擊殺',
					value: `${player.stats.SkyWars.kills}⚔️`,
					inline: true,
				},
				{
					name: '總死亡',
					value: `${player.stats.SkyWars.deaths}☠️`,
					inline: true,
				},
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