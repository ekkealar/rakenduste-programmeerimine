import Item from "../components/Item";

function Home() {
	return (
		<div>
			Koduleht
			<Item name="Item1" price="10" category="phones" />
			<Item name="Item2" price="30" category="tablet" />
		</div>
	);
}

export default Home;
