"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6 text-center">

        <h1 className="text-2xl font-bold">AE BATTERY POINT</h1>
        <h2 className="text-2xl font-bold">🔋 Daily Stock Count</h2>

        <button
          onClick={() => router.push("/count")}
          className="w-full py-4 bg-blue-600 text-white rounded-xl text-lg font-bold"
        >
          ➕ New Count (Today)
        </button>

        <button
          onClick={() => router.push("/history")}
          className="w-full py-4 bg-slate-200 text-slate-800 rounded-xl text-lg font-bold"
        >
          📂 View Old Files
        </button>

      </div>
    </div>
  );
}