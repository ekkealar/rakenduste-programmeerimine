import Item from '../components/Item';

function ItemList(props) {
    return (
        <div class="list">
            {props.items.map(item => (
                <Item
                key = {item.id}
                name = {item.name}
                price = {item.price}
                category = {item.category} />
            ))}
        </div>
    )
}

export default ItemList;