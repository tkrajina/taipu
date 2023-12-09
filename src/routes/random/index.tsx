import { h } from 'preact';
import { route } from 'preact-router';
import { BaseScreen } from '../../components/BaseScreen';
import { textService } from '../../services/TextService';

// Note: `user` comes from the URL, courtesy of our router
const Random = (props: {}) => {
	const texts = textService.loadTexts();
	if (!texts?.length) {
		return <BaseScreen selected='rnd'><h1>No texts found</h1></BaseScreen>
	}

	let rnd = 0;
	for (let i = 0; i < 5; i++) {
		rnd = Math.floor(Math.random()*texts.length);
		if (rnd != textService.lastOpened) {
			break;
		}
	}
	
	const url = `/retype/${rnd}`;
	// window.location.pathname = url
	route(url, true);
	return null;
}

export default Random;
