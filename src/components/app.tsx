import { h } from 'preact';
import { Route, Router } from 'preact-router';
import EditText from '../routes/edit';
import Retype from '../routes/retype';
import SettingsPage from '../routes/settings';
import Stats from '../routes/stats';
import Texts from '../routes/texts';
import Info from '../routes/about';
import Random from '../routes/random';

const App = () => (
	<Router>
		<Route path={"/"} component={Texts} />
		<Route path={"/retype/:textNo"} component={Retype} />
		<Route path={"/random"} component={Random} />
		<Route path={"/edit/:textNo"} component={EditText} />
		<Route path={"/edit"} component={EditText} />
		<Route path={"/settings"} component={SettingsPage} />
		<Route path={"/stats"} component={Stats} />
		<Route path={"/info"} component={Info} />
		<Route path={"*"} component={NotFound} />
	</Router>
);

function NotFound() {
	return <h1>Not found</h1>;
}

export default App;
