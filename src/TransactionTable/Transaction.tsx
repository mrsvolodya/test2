import { Transaction } from "../types/Transition";

export const Transactions: React.FC<{ transactions: Transaction[] }> = ({
  transactions,
}) => {
  return (
    <table className="table-auto min-w-full border-collapse bg-white shadow-lg">
      <thead>
        <tr className="bg-gray-200 text-left">
          <th className="px-4 py-2 font-semibold text-gray-700">
            Transaction Hash
          </th>
          <th className="px-4 py-2 font-semibold text-gray-700">Sequence</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction: Transaction) => {
          return (
            <tr className="border-t" key={transaction.hash}>
              <td className="px-4 py-2 text-gray-800">{transaction.hash}</td>
              <td className="px-4 py-2 text-gray-800">{transaction.out}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
