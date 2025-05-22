'use client';

import { useBtcPrice } from '@/hooks/useBtcPrice';
import transactions from '@/data/transactions.json';

interface SummaryStatsProps {
  className?: string;
}

export function SummaryStats({ className = '' }: SummaryStatsProps) {
  const result = useBtcPrice();
  const price = result?.price;
  const error = result?.error;

  // Calculate portfolio statistics
  const totalBtc = transactions.reduce((sum, tx) => sum + tx.btcAmount, 0);
  const totalUsdSpent = transactions.reduce((sum, tx) => sum + tx.totalUsd, 0);
  const averagePrice = totalUsdSpent / totalBtc;

  // Calculate current value and gain/loss
  const currentValue = price ? totalBtc * price : 0;
  const gainLoss = price ? currentValue - totalUsdSpent : 0;
  const gainLossPercentage = gainLoss ? (gainLoss / totalUsdSpent) * 100 : 0;

  // Convert BTC to sats
  const satsPerBtc = 100000000;
  const totalSats = totalBtc * satsPerBtc;

  if (error) {
    return (
      <div className="p-6 rounded-lg bg-red-900/20">
        <p className="text-red-500">Error loading BTC price: {error}</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-24 ${className}`}>
      {/* BTC per Share */}
      <div className="space-y-4">
        <h3 className="text-sm text-gray-400 tracking-wider">BITCOIN PER SHARE</h3>
        <div className="text-6xl font-light">₿ {totalBtc.toFixed(8)}</div>
      </div>

      {/* Sats per Share */}
      <div className="space-y-4">
        <h3 className="text-sm text-gray-400 tracking-wider">SATS PER SHARE</h3>
        <div className="text-6xl font-light">
          {Math.round(totalSats).toLocaleString()} <span className="text-gray-400">SATS</span>
        </div>
      </div>

      {/* Total Holdings */}
      <div className="space-y-4">
        <h3 className="text-sm text-gray-400 tracking-wider">TOTAL HOLDINGS</h3>
        <div className="text-6xl font-light">
          ${Math.round(currentValue).toLocaleString()}
        </div>
      </div>

      {/* Current BTC Price */}
      <div className="space-y-4">
        <h3 className="text-sm text-gray-400 tracking-wider">CURRENT BTC PRICE</h3>
        <div className="text-6xl font-light">
          ${price ? Math.round(price).toLocaleString() : 'Loading...'}
        </div>
      </div>
    </div>
  );
} 