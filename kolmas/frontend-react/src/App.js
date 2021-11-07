import { useState } from "react";
import "./App.css";
import Fun from "./components/Fun";
import Greeting from "./components/Greeting";
import Square from "./components/square";
import Color from "./components/color";

function App() {
	const [magicNumber, setMagicNumber] = useState(0);
	const [show, setShow] = useState(true);

	return (
		<div className="App">
			{show && <h1>{magicNumber}</h1>}
			<Fun magicNumber={magicNumber} setMagicNumber={setMagicNumber} show={show} setShow={setShow} />
			<Fun magicNumber={magicNumber} setMagicNumber={setMagicNumber} amount={2} show={show} setShow={setShow} />
			<Fun magicNumber={magicNumber} setMagicNumber={setMagicNumber} amount={4} show={show} setShow={setShow} />
			<Greeting name="Ekke" age="21" />
			<hr />
			<Square number="2" />
			<Square number="5" />
			<hr />
			<Color color="blue" />
		</div>
	);
}

export default App;
