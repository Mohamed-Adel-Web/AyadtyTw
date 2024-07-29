export default function ReservationFilter({
  handleFilterChange,
  filter,
}: {
  handleFilterChange(status: string): void;
  filter: string;
}) {
  return (
    <div className="mb-4">
      <button
        className={`mr-2 px-4 py-2 rounded ${
          filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => handleFilterChange("all")}
      >
        All
      </button>
      <button
        className={`mr-2 px-4 py-2 rounded ${
          filter === "available" ? "bg-green-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => handleFilterChange("available")}
      >
        Available
      </button>
      <button
        className={`px-4 py-2 rounded ${
          filter === "notAvailable" ? "bg-red-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => handleFilterChange("notAvailable")}
      >
        Not Available
      </button>
    </div>
  );
}
