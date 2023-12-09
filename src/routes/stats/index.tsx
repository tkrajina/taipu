import { Fragment, h } from 'preact';
import { textService } from '../../services/TextService';
import { BaseScreen } from '../../components/BaseScreen';

interface Stats {
	totalWords: number;
	totalDays: number;
}

function getStats(days: number, counter: {[day: string]: number}) {
	const today = new Date();
	const stats: Stats = { totalDays: 0, totalWords: 0 };
	for (let i = 0; i < days; i++) {
		const day = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
		const key = day.toJSON().split("T")[0];
		const count = counter[key];
		console.log(`${key}: ${count}`);
		if (count) {
			stats.totalDays ++;
			stats.totalWords += count;
		}
	}
	return stats;
}

const Stats = (props: {textNo: string}) => {
	const counters = textService.getWordsCounters();
	const stats = textService.getWordsCounters();

	const keys = Object.keys(counters);
	keys.reverse().sort();

	return (
		<BaseScreen selected='stats'>
			<h1>Stats</h1>
			<div style={{display: "flex", direction: "row"}}>
				<div style={{flexGrow: 1}}>
					<StatsInfo stats={getStats(1, stats)} n={1} />
				</div>
				<div style={{flexGrow: 1}}>
					<StatsInfo stats={getStats(7, stats)} n={7} />
				</div>
				<div style={{flexGrow: 1}}>
					<StatsInfo stats={getStats(30, stats)} n={30} />
				</div>
			</div>
			<h2>Daliy counters</h2>
			<ul>
				{keys.map((date, index) => index > 60 ? null : <li>{date}: <strong>{counters[date]}</strong> <small>words typed</small></li>)}
			</ul>
		</BaseScreen>
	);
};

function StatsInfo(params: {stats: Stats, n: number}) {
	return <p>
		<strong>{params.n == 1 ? "Today" : `${params.n} days `} stats:</strong><br/>
		{params.n > 1 && <Fragment>Active on {params.stats.totalDays}/{params.n} days.<br/></Fragment>}
		Typed {params.stats.totalWords} words.<br/>
		{params.n > 1 && <Fragment>Average {Math.floor(params.stats.totalWords / params.n)} words per day.</Fragment>}
	</p>
}

export default Stats;
