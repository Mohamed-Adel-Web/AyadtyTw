import { IVitalHistory } from "@/types/vitalHistoryTypes/vitalHistory";

export default function VitalHistoryRow({
  history,
  handleShowReport,
}: {
  history: IVitalHistory;
  handleShowReport: (history: IVitalHistory) => void;
}) {
  return (
    <tr key={history.id}>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {new Date(history.date).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {history.pressure}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {history.weight}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {history.blood_sugar}
      </td>{" "}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        <button
          onClick={() => {
            handleShowReport(history);
          }}
          className=" px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Show Report
        </button>
      </td>
    </tr>
  );
}
