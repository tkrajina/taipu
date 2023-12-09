import { Observable } from "../utils/observable";
import { Export, Settings, Text } from "../models";

const TEXTS = "texts2";
const SETTINGS = "settings";
const WORDS_COUNTERS = "words_c";

class TextService {

	todayCounter = new Observable(0);

	lastOpened: number = -1;

	constructor() {
		this.saveWordsCounter(0);
		if (!localStorage.getItem(TEXTS)) {
			const text = new Text("Lorem ipsum");
			text.author = "?";
			text.text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
			this.saveText(undefined, text);
		}
	}

	loadSettings() {
		try {
			return (JSON.parse(localStorage.getItem(SETTINGS)) as Settings) || new Settings();
		} catch (e) {
			console.error(e);
			return new Settings();
		}
	}

	saveWordsCounter(count: number) {
		if ("number" != typeof count) {
			return;
		}
		const counters = this.getWordsCounters();
		const key = new Date().toJSON().split("T")[0];
		if (!counters[key]) {
			counters[key] = 0;
		}
		counters[key] += count;
		console.log("1");
		this.todayCounter.set(counters[key]);
		localStorage.setItem(WORDS_COUNTERS, JSON.stringify(counters));
	}

	saveWordsCounters(counters : {[date: string]: number}) {
		localStorage.setItem(WORDS_COUNTERS, JSON.stringify(counters));
	}

	getWordsCounters(): {[date: string]: number} {
		return JSON.parse(localStorage.getItem(WORDS_COUNTERS)) || {};
	}

	saveSettings(settings: Settings) {
		localStorage.setItem(SETTINGS, JSON.stringify(settings));
	}

	saveTexts(texts: Text[]) {
		localStorage.setItem(TEXTS, JSON.stringify(texts));
	}

	deleteText(textNo: number) {
		const texts = this.loadTexts();
		texts.splice(textNo, 1)
		this.saveTexts(texts);
	}

	loadText(no: number) {
		const texts = this.loadTexts();
		return texts[no] || {title: "Unknown"} as Text;
	}

	saveText(no: number | undefined, txt: Text) {
		const texts = this.loadTexts();
		if (no === undefined) {
			texts.push(txt)
		} else {
			texts[no] = txt;
		}
		this.saveTexts(texts);
	}

	loadTexts() {
		const json = localStorage.getItem(TEXTS);
		let texts = JSON.parse(json) as Text[];
		return texts || [];
	}

	export() {
		return {
			settings: this.loadSettings(),
			stats: this.getWordsCounters(),
			texts: this.loadTexts(),
		} as Export;
	}

}

export const textService = new TextService();
