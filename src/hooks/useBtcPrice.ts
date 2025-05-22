'use client';

import { useState, useEffect } from 'react';

interface BtcPriceResult {
  price: number | null;
  error: string | null;
}

export function useBtcPrice(): BtcPriceResult {
  const [price, setPrice] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPrice() {
      try {
        const response = await fetch('https://api.coinbase.com/v2/prices/BTC-USD/spot');
        if (!response.ok) {
          throw new Error('Failed to fetch BTC price');
        }
        const data = await response.json();
        setPrice(parseFloat(data.data.amount));
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch BTC price');
        setPrice(null);
      }
    }

    fetchPrice();
    const interval = setInterval(fetchPrice, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return { price, error };
} 