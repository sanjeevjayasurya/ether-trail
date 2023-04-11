import Head from 'next/head';
import { useState } from 'react';
import { formatUnits } from 'ethers';
import { alchemy } from '../../lib/alchemy';

export default function Accounts() {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState(null);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleBalanceCheck = async () => {
    if (address) {
      try {
        const balance = await alchemy.core.getBalance(address);
        setBalance(formatUnits(balance.toString(), "ether"));
      } catch (error) {
        console.log('Error fetching balance', error);
        setBalance(null);
      }
    }
  };

  return (
    <div>
      <Head>
        <title>Accounts - My Block Explorer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-2xl font-bold mb-4">Account Balance Checker</h1>

        <label htmlFor="address" className="block font-bold mb-2">
          Ethereum Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={address}
          onChange={handleAddressChange}
          placeholder="Enter Ethereum address here"
          className="border-gray-400 border-2 rounded-lg p-2 mb-4 w-full"
        />

        <button
          type="button"
          onClick={handleBalanceCheck}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 mb-4"
        >
          Check Balance
        </button>

        {balance !== null && (
          <p className="text-xl">
            {address} balance: {balance} ETH
          </p>
        )}
      </main>
    </div>
  );
}