import { Fragment, h } from 'preact';
import { TargetedEvent } from 'preact/compat';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { BaseScreen } from '../../components/BaseScreen';
import { Export, Settings } from '../../models';
import { textService } from '../../services/TextService';
import { assignTypesafe } from '../../utils/partial';

const SettingsPage = (props: {}) => {
	let [settings, setSettings] = useState(new Settings());
	let [exportJSON, setExportJSON] = useState(undefined as Export | undefined);

	useEffect(() => {
		const s = textService.loadSettings()
		if (!s.replacements) { 
			s.replacements = [];
		}
		s.replacements.push(["", ""]);
		setSettings(s);
	}, [])

	const onSave = useCallback(() => {
		settings.replacements = settings.replacements.filter(entry => entry[0] && entry[1])
		textService.saveSettings(settings);
		alert("OK");
	}, [settings]);

	const onUpdateKey = useCallback((val, index) => {
		settings.replacements[index][0] = val;
		setSettings(settings);
	}, [settings]);
	const onUpdateValue = useCallback((val, index) => {
		settings.replacements[index][1] = val;
		setSettings(settings);
	}, [settings]);

	const uploadFile = useCallback(async (event: TargetedEvent<HTMLInputElement>) => {
		event.preventDefault();
		if (window.confirm("Import data. This will overwrite all existing data, continue?")) {
			let file = event.currentTarget.files[0];
			try {
				const json = JSON.parse(await file.text()) as Export;
				if (!json.settings) {
					alert("Missing settings");
					return;
				}
				if (!json.stats) {
					alert("Missing stats");
					return;
				}
				if (!json.texts) {
					alert("Missing texts");
					return;
				}
				textService.saveSettings(json.settings);
				textService.saveTexts(json.texts);
				textService.saveWordsCounters(json.stats);
				alert("Imported");
			} catch (e) {
				alert("Error importing: " + e);
			}
		}
    }, [settings]);

	const onExport = useCallback(() => {
		setExportJSON(textService.export());
	}, []);

	return (
		<BaseScreen selected='settings'>
			<h1>Settings</h1>
			<p>
				{!exportJSON && <Fragment>
					<button onClick={onExport}>Export / import</button>
				</Fragment>}
				{!!exportJSON && <Fragment>
					<ul>
						<li> <a download="export.json" href={"data:text/plain;charset=utf-8," + encodeURIComponent(JSON.stringify(exportJSON))}>Export all data</a>?</li>
						<li> Umport all data: <input type="file" name="myFile" onChange={uploadFile} />	</li>
					</ul>
					<hr/>
				</Fragment>}
			</p>
			<p>
			</p>
			<p>
				Show hidden text duration (in seconds):<br/>
				<input type={"text"} value={settings.unhideDuration} onInput={e => setSettings(assignTypesafe(settings, {unhideDuration: parseInt(e.currentTarget.value)}))} />
			</p>
			<p>
				Character aliases:<br/>
				{settings.replacements.map((entry, index) => <Fragment>
					<input type="text" value={entry[0] || ""} size={2} onInput={e => onUpdateKey(e.currentTarget.value, index)} />:
					<input type="text" value={entry[1] || ""} size={10} onInput={e => onUpdateValue(e.currentTarget.value, index)} /><br/>
				</Fragment>)}
			</p>
			<button onClick={onSave}>Save</button>
			{/* <button onClick={}>Export</button>
			<button onClick={}>Import</button> */}
		</BaseScreen>
	);
};

export default SettingsPage;
