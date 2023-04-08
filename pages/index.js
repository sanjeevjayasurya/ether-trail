import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { alchemy } from "../lib/alchemy";

// export default function Home() {
//   const [latestBlockNumber, setLatestBlockNumber] = useState(null);
//   const [previousBlocks, setPreviousBlocks] = useState([]);

//   useEffect(() => {
//     const fetchLatestBlockNumber = async () => {
//       const blockNumber = await alchemy.core.getBlockNumber();
//       setLatestBlockNumber(blockNumber);
//     };
//     fetchLatestBlockNumber();
//   }, []);

//   useEffect(() => {
//     const fetchPreviousBlocks = async () => {
//       const blockNumber = await alchemy.core.getBlockNumber();
//       const blocks = [];

//       for (let i = blockNumber; i > blockNumber - 10; i--) {
//         const block = await alchemy.core.getBlock(i);
//         blocks.push(block);
//       }

//       setPreviousBlocks(blocks);
//     };
//     fetchPreviousBlocks();
//   }, []);

//   return (
//     <div>
//       <Head>
//         <title>My Block Explorer</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main>
//         <h1 className="text-2xl font-bold">Latest Ethereum Block Number</h1>
//         <p>{latestBlockNumber}</p>

//         <h2 className="text-2xl font-bold">Previous Blocks</h2>
//         <ul>
//           {previousBlocks.map(block => (
//             <li key={block.number}>
//               Block Number: {block.number}, Transactions: {block.transactions.length}
//             </li>
//           ))}
//         </ul>
//       </main>
//     </div>
//   );
// }

export default function Home() {
  const [latestBlockNumber, setLatestBlockNumber] = useState(null);
  const [recentBlocks, setRecentBlocks] = useState([]);

  useEffect(() => {
    const fetchLatestBlockNumber = async () => {
      const blockNumber = await alchemy.core.getBlockNumber();
      setLatestBlockNumber(blockNumber);
    };
    fetchLatestBlockNumber();

    const fetchRecentBlocks = async () => {
      const latestBlockNumber = await alchemy.core.getBlockNumber();
      const recentBlockNumbers = Array.from(Array(10).keys()).map(
        (i) => latestBlockNumber - i
      );
      const recentBlocks = await Promise.all(
        recentBlockNumbers.map((blockNumber) =>
          alchemy.core.getBlock(blockNumber)
        )
      );
      setRecentBlocks(recentBlocks);
    };
    fetchRecentBlocks();
  }, []);

  return (
    <div>
      <Head>
        <title>My Block Explorer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-4">Latest Block</h1>
        {latestBlockNumber && (
          <div className="border border-gray-200 p-4 rounded-lg mb-8">
            <p className="text-lg font-medium mb-2">
              Number: {latestBlockNumber}
            </p>
            <p className="text-lg font-medium mb-2">
              Timestamp: {new Date().toLocaleString()}
            </p>
            <p className="text-lg font-medium mb-2">
              Hash: {alchemy.core.getBlock(latestBlockNumber).hash}
            </p>
            <Link
              className="text-blue-500 hover:underline block mt-2"
              href={`/blocks/${latestBlockNumber}`}
            >
              View Details
            </Link>
          </div>
        )}

        <h2 className="text-2xl font-bold mb-4">Recent Blocks</h2>
        <ul className="border border-gray-200 p-4 rounded-lg">
          {recentBlocks.map((block) => (
            <li key={block.number} className="mb-2">
              <Link
                className="text-blue-500 hover:underline"
                href={`/blocks/${block.number}`}
              >
                Block {block.number}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
