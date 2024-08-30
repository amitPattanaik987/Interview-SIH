import Link from "next/link";
import React from "react";

function Upgrade() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Your Personal AI Interview Coach
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Double your chances of landing that job offer with our AI-powered
          interview prep
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
        <div className="rounded-2xl border border-indigo-600 p-6 shadow-lg ring-1 ring-indigo-600 sm:order-last sm:px-8 lg:p-12 bg-white">
          <div className="text-center">
            <h2 className="text-lg font-medium text-gray-900">
              Pro
              <span className="sr-only"> Plan</span>
            </h2>
            <p className="mt-2 sm:mt-4">
              <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                $30
              </strong>
              <span className="text-sm font-medium text-gray-700">/month</span>
            </p>
          </div>
          <ul className="mt-6 space-y-2">
            {[
              "20 users included",
              "5GB of storage",
              "Email support",
              "Help center access",
              "Phone support",
              "Community access",
              "Free AI interview generation",
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-indigo-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
          <Link href={"/dashboard"}>
            <button className="mt-8 block rounded-full border border-indigo-600 bg-indigo-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-indigo-700 hover:ring-1 hover:ring-indigo-700 focus:outline-none focus:ring active:text-indigo-500">
              Get Started
            </button>
          </Link>
        </div>
        <div className="rounded-2xl border border-gray-200 p-6 shadow-lg sm:px-8 lg:p-12 bg-white">
          <div className="text-center">
            <h2 className="text-lg font-medium text-gray-900">
              Starter
              <span className="sr-only"> Plan</span>
            </h2>
            <p className="mt-2 sm:mt-4">
              <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                $20
              </strong>
              <span className="text-sm font-medium text-gray-700">/month</span>
            </p>
          </div>
          <ul className="mt-6 space-y-2">
            {[
              "10 users included",
              "2GB of storage",
              "Email support",
              "Help center access",
              "Free AI interview generation",
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-indigo-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
          <Link href={"/dashboard"}>
            <button className="mt-8 block rounded-full border border-indigo-600 bg-white px-12 py-3 text-center text-sm font-medium text-indigo-600 hover:ring-1 hover:ring-indigo-600 focus:outline-none focus:ring active:text-indigo-500">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Upgrade;
