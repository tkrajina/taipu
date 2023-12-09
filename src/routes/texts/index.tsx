import { Fragment, h } from 'preact';
import { Link, Route } from 'preact-router';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { Text } from '../../models';
import { textService } from '../../services/TextService';
import { BaseScreen } from '../../components/BaseScreen';

const Texts = () => {
	const [texts, setTexts] = useState([] as Text[]);

	useEffect(() => {
		setTexts(textService.loadTexts())
	}, []);

	const onDelete = useCallback((text: Text, index: number) => {
		if (window.confirm("Really delete " + text.title)) {
			textService.deleteText(index);
			setTexts(textService.loadTexts())
		}
	}, []);

	return (
		<BaseScreen selected='texts'>
			<h1>Texts</h1>
			{!texts?.length && <h2>No texts found. <Link href={"/edit"}>Add new?</Link></h2>}
			{texts?.map((text, index) => <Fragment>
				{index > 0 && <hr />}
				<TextInfo onDelete={onDelete} index={index} text={text} />
			</Fragment>)}
		</BaseScreen>
	);
};

function TextInfo(params: { index: number, text: Text, onDelete: (text: Text, index: number) => void }) {
	return <div>
		<p>
			<strong>
				<Link href={`/retype/${params.index}`}>{params.text.title}</Link>
			</strong>
			<br />
			<small>
				[{Math.floor(100 * (params.text.position / params.text?.text?.length))}% of {params.text?.words || "?"} words]
			</small>
			<br />
			<small><i>{params.text.text.substring(0, 250)}...</i></small>
			<br />
			<small>
				[<Link href={`/edit/${params.index}`}>Edit</Link>]
				[<Link onClick={() => params.onDelete(params.text, params.index)} href="javascript:void()">Delete</Link>]
			</small>
		</p>
	</div>
}

export default Texts;
