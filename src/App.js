import { useState } from 'react';

export default function App() {
  const [items, setItems] = useState([]);

  const handleAddItems = (item) => {
    setItems((items) => [...items, item]);
  };

  const handleDeleteItem = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  const handleToggleItem = (id) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item,
      ),
    );
  };

  const handleClearList = () => {
    const confirmed = window.confirm('Are you sure you want clear the list ?');
    if (confirmed) setItems([]);
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onClearList={handleClearList}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>👕 Far away 👓</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description) return;

    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };
    console.log(newItem);
    onAddItems(newItem);

    setDescription('');
    setQuantity(1);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip 🏸 ?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onClearList, onDeleteItem, onToggleItem }) {
  const [sortBy, setSortBy] = useState('input');

  let sortedItems;

  switch (sortBy) {
    case 'input':
      sortedItems = items;
      break;
    case 'description':
      sortedItems = items
        .slice()
        .sort((a, b) => a.description.localeCompare(b.description));
      break;
    case 'packed':
      sortedItems = items
        .slice()
        .sort((a, b) => Number(a.packed) - Number(b.packed));
      break;
    default:
      sortedItems = items;
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>
      <div class="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Input</option>
          <option value="description">Description</option>
          <option value="packed">Packed</option>
        </select>
        <button onClick={onClearList}>Clear List</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input onChange={() => onToggleItem(item.id)} type="checkbox" />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  const itemsNum = items.length;
  const itemsPacked = items.filter((item) => item.packed).length;
  const itemsPercentage =
    itemsNum > 0 ? Math.round((itemsPacked / itemsNum) * 100) : 0;
  return (
    <footer className="stats">
      <em>
        You have {itemsNum} items on your list, and you already packed{' '}
        {itemsPacked} ({itemsPercentage}%) 🍸
      </em>
    </footer>
  );
}
