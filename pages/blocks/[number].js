import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { alchemy } from "../../lib/alchemy";

export default function BlockPage() {
  const router = useRouter();
  const { number } = router.query;
  console.log(number);
  const [block, setBlock] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchBlock = async () => {
      const blockNumber = parseInt(number);
      const block = await alchemy.core.getBlockWithTransactions(blockNumber);
      console.log(block);
      setBlock(block);
      setTransactions(block.transactions);
    };
    if (number) {
      fetchBlock();
    }
  }, [number]);

  return (
    <div>
      <Head>
        <title>Block | My Block Explorer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div class="p-8">
        <h1 class="text-2xl font-bold mb-4">
          {block ? `Block ${number}` : "Loading Block..."}
        </h1>

        <main class="bg-white rounded-lg shadow-lg p-6">
          {block ? (
            <>
              <p class="text-lg mb-2">
                Timestamp: {new Date(block.timestamp * 1000).toLocaleString()}
              </p>
              <p class="text-lg mb-2">
                Number of Transactions: {block.transactions.length}
              </p>
              <p class="text-lg mb-2">Hash: {block.hash}</p>
            </>
          ) : (
            <p class="text-lg">Loading block details...</p>
          )}

          <h2 class="text-2xl font-bold mt-6 mb-2">Transactions</h2>

          <ul class="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <li key={transaction} class="py-4">
                <a
                  href={`/transactions/${transaction.hash}`}
                  class="text-lg text-blue-600 hover:underline"
                >
                  {transaction.hash}
                </a>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
}
