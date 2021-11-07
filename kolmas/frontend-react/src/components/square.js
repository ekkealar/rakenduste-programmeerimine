import { React } from "react";

function square({ number, sqr, root }) {
	sqr = number * number;
	root = Math.sqrt(number);
	return (
		<>
			<p>Number: {number}</p>
			<p>Number squared: {sqr}</p>
			<p>Number square root: {root}</p>
		</>
	);
}

export default square;
