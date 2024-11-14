interface NavigationProps {
  isConnected: boolean;
  startSubscription: () => void;
  stopSubscription: () => void;
  resetTransactions: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  isConnected,
  startSubscription,
  stopSubscription,
  resetTransactions,
}) => {
  return (
    <div className="flex justify-center mb-6 space-x-4">
      {!isConnected ? (
        <button
          onClick={startSubscription}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
        >
          Start
        </button>
      ) : (
        <button
          onClick={stopSubscription}
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
        >
          Stop
        </button>
      )}
      <button
        onClick={resetTransactions}
        className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 transition"
      >
        Reset
      </button>
    </div>
  );
};
