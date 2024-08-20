import { useState } from 'react';
import Item from './Item';

export default function PackingList({
  items,
  onClearList,
  onDeleteItem,
  onToggleItem,
}) {
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
