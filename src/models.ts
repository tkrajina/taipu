export class Settings {
	replacements: [charTyped: string, replacements: string][] = [
		['"', `"''«»„“‘’‹›‚‘’«»״''`],
		["-", "–"],
		["a", "áàâäāãȧǎǟåȁ"],
		["b", "ḃɓḅƃƀ"],
		["c", "çćčĉċƈ"],
		["d", "ðďḋđḍɗɖ"],
		["e", "éèêëēėęěẽȩȅẹȇ"],
		["f", "ḟƒ"],
		["g", "ģġĝğǧɠ"],
		["h", "ħḣĥḥƕȟ"],
		["i", "íìîïīįi̇ǐịȉȋ"],
		["j", "ĵǰ"],
		["k", "ķǩḱḳƙ"],
		["l", "ĺļľḷƚ"],
		["m", "ḿṁṃ"],
		["n", "ñńňṇǹņ"],
		["o", "óòôöōõȯǒǫǭøɵ"],
		["p", "ṗṕƥṗ"],
		["q", "ǫǭ"],
		["r", "ŕřṙȑɍ"],
		["s", "şśšşŝșṡšṣß"],
		["t", "ťţŧṫṭţțŧŧ"],
		["u", "úùûüūųůũǔǘǜǖǚǜụȕȗ"],
		["v", "ṽʋṿṽ"],
		["w", "ŵẁẃẅẇẉ"],
		["x", "ẍ"],
		["y", "ýỳŷÿȳɏẏ"],
		["z", "źżžẑẓƶ"],
	];
	unhideDuration: number = 4;
}

export class Text {
	title: string = "";
	author: string = "";
	text: string = "";
	position: number = 0;
	words: number = 0;
	constructor(title: string) {
		this.title = title;
	}
}

export class Export {
	settings: Settings;
	texts: Text[];
	stats: {[date: string]: number};
}