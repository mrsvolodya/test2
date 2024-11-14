import { useEffect, useState } from "react";
import { Navigation } from "./Navigation/Navigation";
import { Transactions } from "./TransactionTable/Transaction";
import { Transaction } from "./types/Transition";

function App() {
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const startSubscription = () => {
    if (webSocket) {
      return;
    }

    const socket = new WebSocket("wss://ws.blockchain.info/inv");

    socket.onopen = () => {
      setIsConnected(true);
      socket.send(JSON.stringify({ op: "unconfirmed_sub" }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data && data.x) {
        handleNewTransaction(data.x);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    socket.onclose = () => {
      setIsConnected(false);
    };

    setWebSocket(socket);
  };

  function handleNewTransaction(transaction: any) {
    if (!transaction || !transaction.out) {
      console.error("Invalid transaction data", transaction);
      return;
    }

    const amount = transaction.out.reduce((sum: number, output: any) => {
      if (output && output.value) {
        return sum + output.value;
      }
      return sum;
    }, 0);

    setTransactions((prevTransactions: any) => {
      const bitcoinData = {
        hash: transaction.hash,
        input: transaction.inputs[0].sequence,
        out: transaction.out[0].value,
      };

      const updatedList = [bitcoinData, ...prevTransactions];

      return updatedList;
    });
    setTotalAmount((prevAmount) => prevAmount + amount);
  }

  const stopSubscription = () => {
    if (webSocket) {
      webSocket.close();
      setWebSocket(null);
    }
  };

  const resetTransactions = () => {
    setTransactions([]);
    setTotalAmount(0);
  };

  useEffect(() => {
    return () => {
      webSocket?.close();
      setWebSocket(null);
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold text-center mb-6">
        Bitcoin Transactions
      </h1>

      <Navigation
        isConnected={isConnected}
        resetTransactions={resetTransactions}
        startSubscription={startSubscription}
        stopSubscription={stopSubscription}
      />

      <div className="mb-6">
        <p className="text-lg font-semibold">Total Sum: {totalAmount}</p>
      </div>
      <Transactions transactions={transactions} />
    </div>
  );
}

export default App;
