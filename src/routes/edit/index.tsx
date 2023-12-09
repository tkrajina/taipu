import { h } from 'preact';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { Text } from '../../models';
import { textService } from '../../services/TextService';
import { isAlphanumeric } from '../../utils/strings';
import { route } from 'preact-router';
import { BaseScreen } from '../../components/BaseScreen';

const EditText = (props: {textNo: string}) => {
	const [text, setText] = useState(new Text("Loading..."))

	useEffect(() => {
		const texts = textService.loadTexts();
		setText(texts[parseInt(props.textNo)] || new Text(""));
	}, []);

	const onSave = useCallback(() => {
		let lines = text.text.split("\n");
		for (let n = 0; n < lines.length; n++) {
			lines[n] = lines[n].replaceAll(/\s+/g, " ").replaceAll("\r", "").trim();
		}
		text.text = lines.join("\n");

		let wordCounter = 0;
		for (let n = 1; n < text.text.length + 1; n++) {
			if (!isAlphanumeric(text.text.charAt(n)) && isAlphanumeric(text.text.charAt(n-1))) {
				wordCounter++;
			}
		}
		text.words = wordCounter;

		const texts = textService.loadTexts();
		const textNo = parseInt(props.textNo);
		if (isNaN(textNo)) {
			texts.push(text);
			textService.saveTexts(texts);
		} else {
			texts[textNo] = text;
			textService.saveTexts(texts);
		}
		alert("Saved");
		route('/');
		// route(`${PREFIX}/retype/${props.textNo || texts.length - 1}`);
	}, [text])

	return (
		<BaseScreen selected='new'>
			<h1>Edit text</h1>
			<p>
				Title:<br/>
				<input style={{width: "100%"}} type={"text"} value={text.title} onInput={e => setText((text.title = e.currentTarget.value, Object.assign({}, text)))} />
			</p>
			<p>
				Text:<br/>
				<textarea value={text.text} onInput={e => setText((text.text = e.currentTarget.value, Object.assign({}, text)))} style={{width: "100%", height: "20em"}} />
			</p>
			<button onClick={onSave}>Save</button>
		</BaseScreen>
	);
};

export default EditText;
