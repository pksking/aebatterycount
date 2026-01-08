"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type StockMap = Record<string, number>;

export default function HistoryPage() {
  const router = useRouter();
  const [files, setFiles] = useState<string[]>([]);
  const [openFile, setOpenFile] = useState<string | null>(null);
  const [data, setData] = useState<StockMap>({});

  useEffect(() => {
    const keys = Object.keys(localStorage)
      .filter(k => k.startsWith("stock_"))
      .sort()
      .reverse();

    setFiles(keys);
  }, []);

  const openDate = (key: string) => {
    if (openFile === key) {
      setOpenFile(null);
      setData({});
      return;
    }

    const raw = localStorage.getItem(key);
    if (!raw) return;

    setOpenFile(key);
    setData(JSON.parse(raw));
  };

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
              const isOpen = openFile === f;

              return (
                <div key={f} className="border rounded-lg">
                  <button
                    onClick={() => openDate(f)}
                    className="w-full flex justify-between items-center p-4 hover:bg-blue-50"
                  >
                    <span className="font-medium">{date}</span>
                    <span className="text-blue-600 font-bold">
                      {isOpen ? "Close ▲" : "Open ▼"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 space-y-1 text-sm">
                      {Object.keys(data).length === 0 && (
                        <div className="text-slate-400">
                          No stock data
                        </div>
                      )}

                      {Object.entries(data).map(([name, qty]) => (
                        <div
                          key={name}
                          className="flex justify-between border-b py-1"
                        >
                          <span>{name}</span>
                          <span className="font-semibold">{qty}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
