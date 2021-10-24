import AddCategoryForm from "../components/AddCategoryForm";

function AddCategory() {
	function categorySubmitHandler(category) {
		fetch("http://localhost:8080/categories", {
			method: "POST",
			body: JSON.stringify(category),
			headers: { "Content-Type": "Application/json" },
		});
	}
	return (
		<div id="front">
			<h2>Lisa uus kategooria</h2>
			<AddCategoryForm onAddCategory={categorySubmitHandler} />
		</div>
	);
}

export default AddCategory;
