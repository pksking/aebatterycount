"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HistoryPage() {
  const router = useRouter();
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    const keys = Object.keys(localStorage)
      .filter(k => k.startsWith("stock_"))
      .sort()
      .reverse();

    setFiles(keys);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6">

        <button
          onClick={() => router.push("/")}
          className="text-blue-600 font-bold mb-4"
        >
          ← Back
        </button>

        <h1 className="text-xl font-bold mb-4 text-center">
          📂 Old Stock Files
        </h1>

        {files.length === 0 ? (
          <div className="text-center text-slate-400 py-8">
            No previous stock files found
          </div>
        ) : (
          <div className="space-y-2">
            {files.map(f => {
              const date = f.replace("stock_", "");
              return (
                <button
                  key={f}
                  onClick={() => router.push("/count")}
                  className="w-full flex justify-between items-center p-4 border rounded-lg hover:bg-blue-50"
                >
                  <span className="font-medium">{date}</span>
                  <span className="text-blue-600 font-bold">Open →</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}