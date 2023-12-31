import { Fragment, h } from 'preact';
import { useCallback, useEffect, useRef, useState } from 'preact/hooks';
import { BaseScreen } from '../../components/BaseScreen';
import { Text } from '../../models';
import { textService } from '../../services/TextService';
import { isAlphanumeric } from '../../utils/strings';

var snd = new Audio("data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA//uQZAUAB1WI0PZugAAAAAoQwAAAEk3nRd2qAAAAACiDgAAAAAAABCqEEQRLCgwpBGMlJkIz8jKhGvj4k6jzRnqasNKIeoh5gI7BJaC1A1AoNBjJgbyApVS4IDlZgDU5WUAxEKDNmmALHzZp0Fkz1FMTmGFl1FMEyodIavcCAUHDWrKAIA4aa2oCgILEBupZgHvAhEBcZ6joQBxS76AgccrFlczBvKLC0QI2cBoCFvfTDAo7eoOQInqDPBtvrDEZBNYN5xwNwxQRfw8ZQ5wQVLvO8OYU+mHvFLlDh05Mdg7BT6YrRPpCBznMB2r//xKJjyyOh+cImr2/4doscwD6neZjuZR4AgAABYAAAABy1xcdQtxYBYYZdifkUDgzzXaXn98Z0oi9ILU5mBjFANmRwlVJ3/6jYDAmxaiDG3/6xjQQCCKkRb/6kg/wW+kSJ5//rLobkLSiKmqP/0ikJuDaSaSf/6JiLYLEYnW/+kXg1WRVJL/9EmQ1YZIsv/6Qzwy5qk7/+tEU0nkls3/zIUMPKNX/6yZLf+kFgAfgGyLFAUwY//uQZAUABcd5UiNPVXAAAApAAAAAE0VZQKw9ISAAACgAAAAAVQIygIElVrFkBS+Jhi+EAuu+lKAkYUEIsmEAEoMeDmCETMvfSHTGkF5RWH7kz/ESHWPAq/kcCRhqBtMdokPdM7vil7RG98A2sc7zO6ZvTdM7pmOUAZTnJW+NXxqmd41dqJ6mLTXxrPpnV8avaIf5SvL7pndPvPpndJR9Kuu8fePvuiuhorgWjp7Mf/PRjxcFCPDkW31srioCExivv9lcwKEaHsf/7ow2Fl1T/9RkXgEhYElAoCLFtMArxwivDJJ+bR1HTKJdlEoTELCIqgEwVGSQ+hIm0NbK8WXcTEI0UPoa2NbG4y2K00JEWbZavJXkYaqo9CRHS55FcZTjKEk3NKoCYUnSQ0rWxrZbFKbKIhOKPZe1cJKzZSaQrIyULHDZmV5K4xySsDRKWOruanGtjLJXFEmwaIbDLX0hIPBUQPVFVkQkDoUNfSoDgQGKPekoxeGzA4DUvnn4bxzcZrtJyipKfPNy5w+9lnXwgqsiyHNeSVpemw4bWb9psYeq//uQZBoABQt4yMVxYAIAAAkQoAAAHvYpL5m6AAgAACXDAAAAD59jblTirQe9upFsmZbpMudy7Lz1X1DYsxOOSWpfPqNX2WqktK0DMvuGwlbNj44TleLPQ+Gsfb+GOWOKJoIrWb3cIMeeON6lz2umTqMXV8Mj30yWPpjoSa9ujK8SyeJP5y5mOW1D6hvLepeveEAEDo0mgCRClOEgANv3B9a6fikgUSu/DmAMATrGx7nng5p5iimPNZsfQLYB2sDLIkzRKZOHGAaUyDcpFBSLG9MCQALgAIgQs2YunOszLSAyQYPVC2YdGGeHD2dTdJk1pAHGAWDjnkcLKFymS3RQZTInzySoBwMG0QueC3gMsCEYxUqlrcxK6k1LQQcsmyYeQPdC2YfuGPASCBkcVMQQqpVJshui1tkXQJQV0OXGAZMXSOEEBRirXbVRQW7ugq7IM7rPWSZyDlM3IuNEkxzCOJ0ny2ThNkyRai1b6ev//3dzNGzNb//4uAvHT5sURcZCFcuKLhOFs8mLAAEAt4UWAAIABAAAAAB4qbHo0tIjVkUU//uQZAwABfSFz3ZqQAAAAAngwAAAE1HjMp2qAAAAACZDgAAAD5UkTE1UgZEUExqYynN1qZvqIOREEFmBcJQkwdxiFtw0qEOkGYfRDifBui9MQg4QAHAqWtAWHoCxu1Yf4VfWLPIM2mHDFsbQEVGwyqQoQcwnfHeIkNt9YnkiaS1oizycqJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  

// Note: `user` comes from the URL, courtesy of our router
const Retype = (props: {textNo: string}) => {
	const [hide, setHide] = useState(true);
	const [invalidChar, setInvalidChar] = useState("");
	const [position, setPosition2] = useState(0);
	const [text, setText] = useState(new Text("Unknown"))
	const [textHidden, setTextHidden] = useState("");
	const [wordsCount, setWordsCount] = useState(0);
	const settings = useRef(textService.loadSettings());

	const setPositionAndSkipNewlines = function(pos: number) {
		while (text.text[pos] == "\n" || text.text[pos] == "\r") {
			console.log("next line!")
			pos ++;
		}
		setPosition2(pos);
	}

	const replacements = useRef({} as {[key: string]: string});

	useEffect(() => {
		setTimeout(() => {
			onScroll()
		}, 250);
	}, []);

	const saveTimeout = useRef(undefined as any);
	const onSave = useCallback(() => {
		clearTimeout(saveTimeout.current);
		saveTimeout.current = setTimeout(() => {
			if (Math.abs(text.position - position) > 5) {
				text.position = position;
				textService.saveText(parseInt(props.textNo), text);
				console.log(`Saved progress to ${position}`)
			}
			if (wordsCount > 0) {
				textService.saveWordsCounter(wordsCount);
				setWordsCount(0);
				console.log("Saved " + wordsCount + " words");
			}
		}, 2000);
	}, [position, wordsCount]);

	const texts = textService.loadTexts();
	if (!texts?.length) {
		return <BaseScreen selected='texts'>
			<h1>No texts found</h1>
		</BaseScreen>
	}

	const onJump = useCallback(() => {
		const jump = parseInt(window.prompt(`You are currently at position ${position} of ${text?.text?.length}. Jump to:`));
		if (!isNaN(jump)) {
			setPosition2(jump);
		}
	}, [position])

	const onScroll = useCallback(() => {
		document.getElementById('cursor')?.scrollIntoView(/* {behavior: "smooth"} */);
	}, [])

	useEffect(() => {
		for (const entry of settings.current.replacements) {
			replacements.current[entry[0]] = entry[1];
		}

		const textNo = parseInt(props.textNo);
		let txt = textService.loadText(textNo);
		textService.lastOpened = textNo;

		// txt.text = txt.text.replaceAll("\r", "");
		setText(txt);
		setPositionAndSkipNewlines(txt.position || 0);
		// setText(textCleaned);
		if (position > text.text.length + 1) {
			setPositionAndSkipNewlines(0);
		}
		setTextHidden(txt.text.split("").map(ch => isAlphanumeric(ch) ? "_" : ch).join(""));
	}, [])

	useEffect(() => {
		const keyListener = (event: KeyboardEvent) => {
			setInvalidChar("");
			console.log("code:" + event.code + ", " + event.key + "meta key" + event.metaKey  + " ctrl key " + event.ctrlKey + ".")
			if (event.ctrlKey && event.key == "j") {
				onJump();
				return;
			}
			if (event.ctrlKey && event.key == "l") {
				onScroll();
				return;
			}
			if (event.metaKey && (event.code == "KeyC" || event.code == "KeyV" || event.code == "KeyR")) {
				console.log("nothing")
				return;
			}
			event.preventDefault();
			// console.log("position" + position)
			onSave();
			setHide(true);
			if (event.key == "ArrowRight") {
				setPositionAndSkipNewlines(position + 1);
				return;
			}
			if (event.key == "Tab") {
				if (event.shiftKey) {
					for (let p = position - 1; p > 0; p--) {
						if (!isAlphanumeric(text.text[p - 1]) && isAlphanumeric(text.text[p])) {
							setPositionAndSkipNewlines(p);
							return;
						}
					}
				} else {
					for (let p = position + 1; p < text.text.length; p++) {
						if (!isAlphanumeric(text.text[p - 1]) && isAlphanumeric(text.text[p])) {
							setPositionAndSkipNewlines(p);
							return;
						}
					}
				}
			}
			if (event.key == "Escape") {
				onToggleHide();
				return;
			}
			if (event.key == "Backspace" || event.key == "ArrowLeft") {
				setPosition2(position - 1);
				return;
			}
			console.log(`#${position} ${text[position]} (${text.text[position]?.charCodeAt(0)}) == ${event.key} (${event.key?.charCodeAt(0)}/${event.key}) ?`)
			if (text.text[position]?.toLocaleLowerCase() == event.key.toLocaleLowerCase() || replacements.current[event.key]?.indexOf(text.text[position]) >= 0) {
				setPositionAndSkipNewlines(position + 1);
				setInvalidChar("");
				const current = text.text[position];
				const next = text.text[position + 1];
				if (isAlphanumeric(current) && !isAlphanumeric(next)) {
					setWordsCount(wordsCount + 1);
					console.log(`words ending with ${current}${next}, counter now ${wordsCount}`);
				}
			} else {
				console.log("invalid char: ", event.key)
				if (event.key?.length > 1) {
					setInvalidChar("");
				} else {
					setInvalidChar(event.key);
					if (event.key) {
						setTimeout(() => snd.play(), 10)
					}
				}
			}
		}
		document.addEventListener('keydown', keyListener);
		return () => {
			document.removeEventListener('keydown', keyListener);
		}
	}, [position, text, wordsCount, invalidChar]);

	const hideTimeout = useRef(undefined as any);

	const onToggleHide = useCallback(() => {
		setHide(false);
		clearTimeout(hideTimeout.current);
		hideTimeout.current = setTimeout(() => setHide(true), 1000 * settings.current.unhideDuration);
	}, [hide]);

	return (
		<BaseScreen selected='texts'>
			{/* <pre>{text.text.substring(0, position)}<span style={{color: "orange"}}>|</span>{text.text.substring(position)}</pre> */}
			<h1>{text.title}</h1>
			{text.author && <p>
				Author: <i>{text.author}</i>
			</p>}
			<p style={{border: "1px solid gray", borderRadius: "20px", padding: "10px", fontSize: "0.75em"}}>
				<strong>Keys:</strong><br/>
				<strong>&lt;tab&gt;</strong>: move to next word.<br/>
				<strong>&lt;shift&gt;+&lt;tab&gt;</strong>: move to previous word.<br/>
				<strong>&lt;esc&gt;</strong>: Show the rest of the text for {settings.current.unhideDuration}s<br/>
				<strong>&lt;ctrl&gt;+j</strong>: jump on position<br/>
				<strong>&lt;ctrl&gt;+l</strong>: scroll to cursor<br/>
			</p>
			<p style={{whiteSpace: "pre-line"}} /*style={{border: !!invalid ? "1px solid orange" : undefined}}*/>
				<strong>{(text.text.substring(0, position))}</strong>
				<span id="cursor" style={{border: "1px solid orange", color: "red"}}>{invalidChar || ""}</span>
				<span style={{color: !!invalidChar ? "orange" : undefined}}>{textWithNewlines((hide ? textHidden : text.text).substring(position))}</span>
			</p>
		</BaseScreen>
	);
};

function textWithNewlines(txt: string) {
	const lines = txt.split("\n");
	return lines.map((line, index) => {
		if (index < lines.length - 1) {
			return line + "↵";
		}
		return line;
	}).join("\n")
}

export default Retype;
