import AddItemForm from "../components/AddItemForm";

function AddItem() {
	function itemSubmitHandler(item) {
		//console.log(item);
		fetch("http://localhost:8080/items", {
			method: "POST",
			body: JSON.stringify(item),
			headers: { "Content-Type": "Application/json" },
		});
	}
	return (
		<div id="front">
			<h2>Lisa uus ese</h2>
			<AddItemForm onAddItem={itemSubmitHandler} />
		</div>
	);
}

export default AddItem;
