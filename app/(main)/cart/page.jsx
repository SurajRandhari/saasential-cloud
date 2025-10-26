"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function CartPage() {
  // Replace with your state logic / context for real cart items
  const [quantity, setQuantity] = useState(2);
  const price = 189;
  const basePrice = price * quantity;

  return (
    <div className="max-w-5xl mx-auto px-2 my-30">
      {/* HEADER */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">Cart Summary</h1>
      <div className="flex flex-col lg:flex-row gap-7">
        {/* Cart Items */}
        <section className="flex-1 bg-white rounded-xl p-6 shadow border">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <img
              src="https://images.pexels.com/photos/3183184/pexels-photo-3183184.jpeg"
              alt="Training"
              className="rounded-md w-28 h-20 object-cover"
            />
            <div className="flex-1 min-w-0">
              <Link href="#" className="font-semibold text-gray-900 hover:underline">
                UCA Cash Flow Analysis - <span className="text-sm font-normal underline">Recording - Single License</span>
              </Link>
              <div className="my-2">
                <span className="text-xl font-bold text-gray-900">${basePrice.toFixed(2)}</span>
                <span className="text-sm text-green-700 ml-2">( {quantity} Quantity Added )</span>
              </div>
              {/* Quantity Selector */}
              <div className="flex gap-1 items-center mt-2">
                <button
                  className="w-7 h-7 bg-gray-100 border rounded flex items-center justify-center text-lg font-semibold disabled:opacity-40"
                  onClick={() => setQuantity(q => Math.max(1, q-1))}
                  disabled={quantity <= 1}
                  aria-label="Decrease"
                >-</button>
                <span className="px-4 min-w-[35px] text-center">{quantity}</span>
                <button
                  className="w-7 h-7 bg-gray-100 border rounded flex items-center justify-center text-lg font-semibold"
                  onClick={() => setQuantity(q => q+1)}
                  aria-label="Increase"
                >+</button>
              </div>
            </div>
            <button
              aria-label="Remove"
              className="ml-auto text-gray-400 hover:text-red-600 transition"
              title="Remove Item"
            >&times;</button>
          </div>
          {/* Discount App */}
          <div className="flex mt-6 gap-3">
            <input
              type="text"
              placeholder="Enter Discount Code"
              className="flex-1 px-3 py-2 border rounded bg-gray-50 focus:outline-none text-gray-700"
            />
            <button className="bg-gray-900 text-white rounded px-5 py-2 font-medium">
              Apply Discount
            </button>
          </div>
          {/* Continue Shopping */}
          <div className="mt-5">
            <Link
              href="/training"
              className="inline-flex items-center border rounded px-4 py-2 text-gray-800 hover:bg-gray-100 font-medium"
            >
              &larr; Continue Shopping
            </Link>
          </div>
        </section>

        {/* Price Summary + Checkout */}
        <aside className="w-full lg:w-80 flex-shrink-0">
          <div className="bg-white border shadow rounded-xl p-6 mb-3">
            <div className="text-md font-semibold border-b pb-2 mb-3 text-gray-700">Price Details</div>
            <dl className="space-y-1 text-base mb-4 text-gray-700">
              <div className="flex justify-between">
                <dt>Base Price</dt>
                <dd>${basePrice.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Discount Price</dt>
                <dd>$0.00</dd>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-lg mt-2">
                <dt>Amount Payable</dt>
                <dd>${basePrice.toFixed(2)}</dd>
              </div>
            </dl>
            <button
              className="w-full bg-gray-900 text-white rounded font-medium text-base py-2 transition hover:bg-gray-700"
              // onClick={} // Wire up to payment handler
            >
              Proceed
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
