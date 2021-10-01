import Category from "./Category";

function CategoryList(props) {
	return (
		<div>
			{props.categories.map((category) => (
				<Category key={category.id} name={category.name} type={category.category} />
			))}
		</div>
	);
}

export default CategoryList;
