export default function Stats({ items }) {
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
