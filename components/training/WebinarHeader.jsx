export default function WebinarHeader() {
  return (
    <div className="flex justify-between items-center border-b pb-2 mb-4">
      <h1 className="text-2xl font-bold">Live Webinars</h1>
      <div className="flex items-center space-x-4 text-sm text-gray-500">
        <span>First</span>
        <span>Previous</span>
        <span className="text-blue-600">1</span>
        <span>2</span>
        <span>...</span>
        <span>Last</span>
        <span>Showing 1-20 of 94</span>
        <select className="border px-2 py-1 rounded text-gray-700">
          <option>20 per page</option>
        </select>
      </div>
    </div>
  );
}
