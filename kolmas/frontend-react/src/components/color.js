import { React } from "react";

function color({ color }) {
	var colors = ["blue", "red", "yellow", "green"];

	var rand = Math.floor(Math.random() * colors.length);

	color = colors[rand];
	return (
		<>
			<h1 style={{ color: color }}>Randocolor</h1>
		</>
	);
}

export default color;
