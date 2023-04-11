import { formatUnits } from "ethers";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { alchemy } from "../../lib/alchemy";

export default function TransactionPage() {
  const router = useRouter();
  const { hash } = router.query;
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      const transaction = await alchemy.core.getTransaction(hash);
      setTransaction(transaction);
    };
    if (hash) {
      fetchTransaction();
    }
  }, [hash]);

  return (
    <div>
      <Head>
        <title>Transaction {hash} | My Block Explorer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div class="p-8">
        <h1 class="text-2xl font-bold mb-4">Transaction {hash}</h1>

        <main class="bg-white rounded-lg shadow-lg p-6">
          {transaction ? (
            <>
              <p class="text-lg mb-2">
                Block Number: {transaction.blockNumber}
              </p>
              <p class="text-lg mb-2">From: {transaction.from}</p>
              <p class="text-lg mb-2">To: {transaction.to}</p>
              <p class="text-lg mb-2">
                Value: {formatUnits(transaction.value.toString(), "ether")} ETH
              </p>
              <p class="text-lg mb-2">
                Gas Price:{" "}
                {formatUnits(transaction.gasPrice.toString(), "gwei")} GWEI
              </p>
            </>
          ) : (
            <p class="text-lg">Loading transaction details...</p>
          )}
        </main>
      </div>
    </div>
  );
}
