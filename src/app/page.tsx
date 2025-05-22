'use client';

import { SummaryStats } from '@/components/SummaryStats';
import { TransactionsTable } from '@/components/TransactionsTable';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center justify-between">
            <Image
              src="/evergive-logo.png"
              alt="EverGive"
              width={120}
              height={24}
              className="w-auto h-6"
              priority
            />
            <nav className="flex gap-8 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">About</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
              <a href="#" className="hover:text-white transition-colors">News</a>
            </nav>
          </div>
        </header>

        {/* Main Stats */}
        <div className="space-y-24">
          <SummaryStats />
          <div className="text-xs text-gray-400 text-center">
            THESE NUMBERS ARE UPDATED IN REAL-TIME FROM THE BLOCKCHAIN
          </div>
        </div>

        {/* Transactions Table */}
        <div className="mt-24">
          <TransactionsTable />
        </div>
      </div>
    </div>
  );
} 