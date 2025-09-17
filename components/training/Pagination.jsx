export default function Pagination() {
  return (
    <div className="flex space-x-2 mt-4 text-blue-600">
      <span className="cursor-pointer">First</span>
      <span className="cursor-pointer">Previous</span>
      <span className="px-2 border border-blue-600 rounded">1</span>
      <span className="cursor-pointer">2</span>
      <span className="cursor-pointer">3</span>
      <span className="cursor-pointer">4</span>
      <span className="cursor-pointer">5</span>
      <span className="cursor-pointer">Next</span>
      <span className="cursor-pointer">Last</span>
    </div>
  );
}
