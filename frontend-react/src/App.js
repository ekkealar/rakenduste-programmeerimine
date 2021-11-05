import { BrowserRouter, Route, Switch } from "react-router-dom";
import Posts from "./pages/Posts";
import Header from "./components/Header";
import Account from "./pages/Account";
import AddPost from "./pages/AddPost";
import Registration from "./components/Registration";
import Main from "./pages/Main";

import "./components/App.css";

function App() {
	return (
		<BrowserRouter>
			<Route path="/" component={Header} />
			<Switch>
				<Route exact path="/" component={Main} />
				<Route exact path="/posts" component={Posts} />
				<Route exact path="/addPost" component={AddPost} />
				<Route exact path="/login" component={Account} />
				<Route exact path="/account/registration" component={Registration} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
