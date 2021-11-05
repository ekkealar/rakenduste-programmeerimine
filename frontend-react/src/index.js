import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Store from "./store";
import reportWebVitals from "./reportWebVitals";
import { Layout } from "antd";

const { Content } = Layout;

ReactDOM.render(
	<React.StrictMode>
		<Store>
			<Layout>
				<Content>
					<App />
				</Content>
			</Layout>
		</Store>
	</React.StrictMode>,
	document.getElementById("container")
);

reportWebVitals();
