'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#1B4D3E] via-[#1A3B35] to-[#1B4D3E] text-white py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo and Tagline */}
          <div className="col-span-2 md:col-span-1 mb-6 md:mb-0">
            <div className="mb-4">
              <Image
                src="/evergive-logo.png"
                alt="EverGive"
                width={240}
                height={48}
                className="w-auto h-10 md:h-12"
                priority
              />
            </div>
            <p className="text-gray-300 text-sm md:text-base">Make your donations last forever</p>
          </div>

          {/* Company Links */}
          <div className="col-span-1">
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm md:text-base text-gray-300 hover:text-white">Our Investment Approach</Link></li>
              <li><Link href="#" className="text-sm md:text-base text-gray-300 hover:text-white">Blog</Link></li>
              <li><Link href="#" className="text-sm md:text-base text-gray-300 hover:text-white">About</Link></li>
              <li><Link href="#" className="text-sm md:text-base text-gray-300 hover:text-white">Careers</Link></li>
            </ul>
          </div>

          {/* Policies Links */}
          <div className="col-span-1">
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Policies</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm md:text-base text-gray-300 hover:text-white">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm md:text-base text-gray-300 hover:text-white">Terms and Conditions</Link></li>
            </ul>
          </div>

          {/* Contact and Social */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Contact us</h3>
            <div className="space-y-2">
              <Link href="#" className="block text-sm md:text-base text-gray-300 hover:text-white">Contact</Link>
              <div className="mt-4">
                <p className="text-sm md:text-base text-gray-300 mb-2">👋 Follow us:</p>
                <div className="flex gap-4">
                  <Link href="#" className="text-gray-300 hover:text-white">
                    <Image 
                      src="/x.svg" 
                      alt="X (Twitter)" 
                      width={20} 
                      height={20} 
                      className="w-5 h-5 md:w-6 md:h-6"
                    />
                  </Link>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    <Image 
                      src="/linkedin.svg" 
                      alt="LinkedIn" 
                      width={20} 
                      height={20} 
                      className="w-5 h-5 md:w-6 md:h-6"
                    />
                  </Link>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    <Image 
                      src="/instagram.svg" 
                      alt="Instagram" 
                      width={20} 
                      height={20} 
                      className="w-5 h-5 md:w-6 md:h-6"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-8 md:mt-16 pt-6 md:pt-8 border-t border-gray-700">
          <p className="text-xs md:text-sm text-gray-400">
            Givetree Ltd trading as EverGive, is a company registered in England and Wales with registrations number 13405448
          </p>
          <p className="text-xs md:text-sm text-gray-400 mt-2">
            © 2025 Evergive All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
} 