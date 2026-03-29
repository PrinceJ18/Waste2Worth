export default function History() {
  const data = JSON.parse(localStorage.getItem("history") || "[]");

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Scan History</h1>

      {data.map((item: any, i: number) => (
        <div key={i} className="mb-2 p-3 bg-gray-100 rounded">
          {item.item} → {item.category} ({item.time})
        </div>
      ))}
    </div>
  );
}