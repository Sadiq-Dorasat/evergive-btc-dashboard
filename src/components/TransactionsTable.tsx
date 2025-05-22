'use client';

import React, { useState } from 'react';
import transactions from '@/data/transactions.json';

export function TransactionsTable() {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof typeof transactions[0];
    direction: 'asc' | 'desc';
  }>({ key: 'date', direction: 'desc' });

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key: keyof typeof transactions[0]) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === 'asc'
          ? 'desc'
          : 'asc',
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-xs text-gray-400 border-b border-gray-800">
            <th className="pb-4 font-normal">
              <button
                onClick={() => requestSort('date')}
                className="hover:text-white transition-colors"
              >
                DATE
              </button>
            </th>
            <th className="pb-4 font-normal">
              <button
                onClick={() => requestSort('btcAmount')}
                className="hover:text-white transition-colors"
              >
                BTC AMOUNT
              </button>
            </th>
            <th className="pb-4 font-normal">
              <button
                onClick={() => requestSort('totalUsd')}
                className="hover:text-white transition-colors"
              >
                USD AMOUNT
              </button>
            </th>
            <th className="pb-4 font-normal">
              <button
                onClick={() => requestSort('totalUsd')}
                className="hover:text-white transition-colors"
              >
                PRICE PER COIN
              </button>
            </th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {sortedTransactions.map((tx, index) => {
            const pricePerCoin = tx.totalUsd / tx.btcAmount;
            return (
              <tr
                key={index}
                className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors"
              >
                <td className="py-4">{new Date(tx.date).toLocaleDateString()}</td>
                <td className="py-4">₿{tx.btcAmount.toFixed(8)}</td>
                <td className="py-4">${tx.totalUsd.toLocaleString()}</td>
                <td className="py-4">${pricePerCoin.toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
} 