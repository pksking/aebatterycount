"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";

/* ===== MASTER PRODUCT LIST (ORDER FIXED) ===== */
const PRODUCTS = [
  
  "A 2.5 LC",
  "A 5LB",
  "A 7B",
  "A 9B",
  "A Z4",
  "A Z5",
  "A Z7",
  "A Z9",
  "A Z14R",
  "A Z6",
  "A Z5L",
  "A Z4L",

  "A 50B20L/R",
  "574102069",
  "600109087",
  "A 55B24LS",
  "AMARON FLO",
  "A 40B20 L / R",
  "A 42B20 L/ R",
  "A 45D20L",
  "A 90D23L",
  "AAM-FL-545106036 (din 45)",
  "AAM-FL-566112060 (Din 66)",
  "AAM-FL-545102054 (din 55L)",
  "A 80D23L",
  "AAM-FL-550113042 (din 50R)",
  "AAM-FL-550114042 (din 50L)",
  "AAM-FL-555111054 (din 55R)",
  "AAM-FL-565106590 (din 65LH)",
  "AAM-FL-580112073",

  "AAM-GO-0034B20R",
  "AAM-GO-0034B20L",
  "A 38B20 L / R",
  "A 95D26 L / R",
  "AAM-GO-565106590",
  "A 105D26R",
  "A 105D31R/L",
  "AAM-GO-135D31R",
  "A 50B24L",

  "AAM-HR-TR500D31 L/R",
  "AAM-HR-NT600H29 L/R",
  "AAM-HR-NT600E41 L/R",

  "AAM-HW-HC620D31R",
  "AAM-HW-NT650H29R",
  "AAM-HW-NT700H29R",
  "AAM-HW-NT800D04R",
  "AAM-HW-NTX00D04R",
  "AAM-HW-HC180D04R",
  "AAM-HW-HCX20H52R",
  "AAM-HW-NT700E41R",
  "AAM-HW-NT800E41R",
  "AAM-HW-NT800F51R",

  "AAM-BL-0BL100RMF/LMF",
  "AAM-BL-0BL300RMF/LMF",
  "AAM-BL-0BL400RMF/LMF",

  "AAM-BL-0BL700RMF/LMF",
  "AAM-BL-0BL800RMF/LMF",
  "AAM-BL-0BL900RMF/LMF",
  "AAM-BL-BL1000RMF/LMF",
  "AAM-BL-BL1300RMF",

  "AAM-FR-0FR300RMF",
  "AAM-FR-0FR400LMF/RMF",
  "AAM-FR-0FR650RMF/LMF",

  "TUBULAR BATTERIES",
  "AM 130L",
  "AM 150L",
  "AM 200L",
  "E Z4",
  "E Z4A",
  "E Z5",
  "E Z6",
  "E Z7",
  "E Z9",
  "E 2.5 LC",
  "E 5L-B",
  "E 7B-B",
  "E 9B",
  "E 14L-A2",
  "E 14",

  "E 38B20L/R",
  "FML5-ML40LBH/RBH",
  "E MLDIN44LH/R",
  "FML0-ML45D21LBH",
  "E MLDIN50",
  "E MLDIN55L/R",
  "E ML55D23L",
  "E MLDIN60",
  "FML0-MLDIN65LH",
  "E MLDIN66",
  "FML0-ML75D23LBH",
  "E MLDIN80",
  "FML0-MLM42(ISS)",
  "FML0-MLDIN47RMFISS",
  "E MLDIN70(ISS)",
  "FML0-MLN55(ISS)",

  "FMTO-MTRED35L/35R",
  "FMTO-MTRED45L",
  "FMTO-MTREDDIN100",

  "E EY700/L/R",
  "FEYO-EY105D31L/R",
  "FEPO-EGRID80D26R",
  "FEYO-EY34B19L/R",

  "XP800",
  "XP880",
  "FXP5-XP1000",
  "XP1200",
  "XP1300",
  "XP1500",
  "FXP5-XP1800",
  "FXP5-XP2000",

  "FEPO-EPIQDIN74L",
  "FEPO-EPIQ35L/R",
  "FEPO-EPIQ35LBH",

  "EKO32",
  "FEKO-EKO40/L",
  "FEKO-EKO60L/R",
  "FEKO-EKO50L",

  "FEGO-DRIVE130R",
  "FEGO-DRIVE100L",
  "FEGO-DRIVE80L/R",
  "FEGO-DRIVE88L",
  "FEG5-DRIVE150R",

  "FEIO-IT500",
  "FEIO-IT500 SLK",
  "FEIO-IT750",
  "FEIO-IT900",
  "FEIO-IT950",

  "IMST1000",
  "IMST1500",
  "FEM0-IMTT1500",
  "IMTT1800",
  "FEM0-IMTT2000",
  "FEM0-IMTT2300",
  "FEM0-IMTT2500",

  "FELO-IGST1500",
  "FELO-IGTT1500",
  "EXIDE INVAHOMZ",
  "FEH0-IHST1000",
  "FEH0-IHST1200",
  "FEH0-IHST1350",
  "FEH0-IHTT1500",
  "IHTT2000",
  "IHJT-IHJT2000",

  "HX00-GQP700 (1KVA/12V)",
  "HX00-GQP12V 900 (1.5KVA/12V)",
  "HX00-GQP1125 (1KVA/12V)",
  "HX00-GQP1450N (1KVA/12V)",
  "HX00-GQP1625 (1.5KVA/24V)",

  "HX00-MAGIC800",
  "HX00-MAGIC875",
  "HX00-MAGIC1125",
  "HX00-MAGIC1625",

  "HX00-STAR700 (700/12V)",
  "STAR900",
  "STAR1125",
  "STAR1375",
  "STAR1625 (1.6KVA/12V)",
  "HX00-STAR1625 (1.6KVA/24V)",
  "HX00-STAR2550 (2KVA/24V)",

  "KX00-024EXIDEN020 (2KVA/24V)",
  "KX00-036EXIDEP025M (2.5KVA/36V)",
  "KX00-048EXIDEP025M (2.5KVA/48V)",
  "KX00-048EXIDEP035M (3.5KVA/48V)",
  "KX00-048EXIDE052M (5.2KVA/48V)",
  "KX00-096EXIDEP052M (5.2KVA/96V)",
  "KX00-120EXIDE075M (7.5KVA/120V)",
  "KX00-180EXIDE100 (10KVA/180V)",
  "KX00-192EXIDE120 (120KVA/192V)",
  "ECO VOLT NEO 2300",
  "EVO 2300",
  "OPTIMUS 2300",
  "OPTIMUS 2800",
  "OPTIMUS 3500",
  "OPTIMUS 4300",
  "OPTIMUS 3800",
  "OPTIMUS 4500",
  "OPTIMUS 6000",
  "OPTIMUS (6.5KVA) 6500+/72V",

  "ECO VOLT NEO 1050",
  "EVO 1050",
  "EVO 1250",
  "EVO 1550",
  "ECO VOLT NEO 1650",
  "Zelio 1250",
  "Zelio 1150",
  "ILST 8036 (60 AH)",
  "LPTT 12200",
  "ILST 12042",
  "BC 16048ST",
  "RC 15000 PRO (120 AH)",
  "BC 18048ST",
  "BC 12036ST (100 AH)",
  "ILTT 18060 PRO",
  "RC 18000ST (22+22) PRO",
  "RC 18000 PRO (150 AH)",
  "RC 25000 PRO",
  "RC18000 ST (18+18) (150 AH)",
  "RC18000 TALL (18+18) (150 AH)",

  "6LMS 200L",
  "6LMS 150L",
  "6LMS100 F",
  "6LMS100 T",
  "EL 150 (48 MONTHS)",
  "6EL150L",
  "6SEZ105L",

  "NUMERIC 1000",
  "NUMERIC 600",

  "EP-7.5 AH",
  "EP-1234 (9 AH)",
  "CS 7 AH",
  "EP 12",
  "EP 18",
  "EP 26",
  "EP 42",
  "EP 65",
  "EP75-12",
  "EP 100",
  "EP120-12",
  "EP130-12",
  "EP150-12",
  "EP160-12",
  "EP 200-12",
  "EL 40",
  "EL 60",
  "EL75",
  "6EL100",
  "EL150",
  "6EL200 (48 MONTHS)",

  "Q 7 AH",
  "Q 9 AH",
  "Q 12-12 AH",
  "Q 18-12 AH",
  "Q 26",
  "Q 42",
  "Q 65",
  "Q75-12 AH",
  "Q100",
  "Q 120",
  "Q 130",
  "Q 150",
  "Q 160-12 AH",
  "Q 200-12 AH",

  "1 LITRE BOTTLES",
  "5 LITRE CAN",
  
  "microtek 1025",
  "microtek 1100",
  "MIKROTEK 2350",
  "MICROTEK JM SW 3000/24",
  "MIKROTEK JM SW 2500/24",
  "MICROTEK 1750",
  "MICROTEL 1075",
  "MICROTEK 1825",
  "MICROTECK 1550",

  "HITEK TROLLY",
  "SINGLE TROLLY",
  "TALL BATTERY TROLLY",
  "TALL DOUBBLE",
  "SINGLE TROLLY DOUBBLE p3",
  "extended trolley tray",

  "BI1500",
  "BX1100",

  "APC BX600",

  "AMARON 85D23R",
  "LUMINOUS SOLAR 1450",
  "ELITO 150AH",
  "PRO 3kva 96vdc EXTERNAL",
  "PROSTAR 3KVA",
  "MGST 1200",
  "3KVA oniline ups",
  "1kva oniline ups bib",
  "c 1kva ups exlernal",
  "mgst 1500",
  "ELITO DIN50",
  "exide ceil cltt 2000",
  "exide ceil cltt 1500",
  "ELITO 38B20 R/L",
  "AVO",
  "AMARON OIL",
  "LU TROLLY TX100S",
  "JOS TECH TROLLY",
  "MGST 800",
  "FUJI 1 kva",
  "MGTT 1800",
  "EXIDE 3.5KV",
  "solar pv mod pe 550",
  "microtek 5kva 48vdc",
  "10KVA online ups",
  "exide 6el 60",
  "mgtt 1500",
  "exide ceil clst 1200",
  "iron 26ah battery trolly",
  "microtek 1000+ inbuild ups (legend)",
  "microtek 1225",
  "microtek 1075 hybrid",
  "microtek 1275",
  "srv10kuxi-inx",
  "amptek 12v 32ah",
  "microtek jumbo 3750 36v",
  "amaron duro-47R",
  "microtek jumbo 4000/48vdc",
  "exide clst 1500",
  "microtek 3500",
  "microtek 5500",
  "amaron duro din 70",
  "optiums 11000",
  "RC 25000",
  "INTU UPS BATTERY 1290",
  "INTU UPS BATTERY 1260",
  "6sez150",
  "pp tray tall",
  "pp tray tall wide",
  "pp tray small",
  "eezy 80d23r",
  "mgtt 2000",
];

type StockMap = Record<string, number>;

export default function CountPage() {
  const router = useRouter();
  const today = new Date().toISOString().slice(0, 10);
  const storageKey = `stock_${today}`;

  const [search, setSearch] = useState("");
  const [qty, setQty] = useState("");
  const [stock, setStock] = useState<StockMap>({});

  const searchRef = useRef<HTMLInputElement>(null);
  const qtyRef = useRef<HTMLInputElement>(null);

  /* Load saved data */
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setStock(JSON.parse(saved));
  }, [storageKey]);

  /* Save data */
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(stock));
  }, [stock, storageKey]);

  /* Autocomplete */
  const results = useMemo(() => {
    if (!search) return [];
    return PRODUCTS.filter(p =>
      p.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 5);
  }, [search]);

  /* Add count */
  const addCount = () => {
    if (!search || !qty) return;
    const n = Number(qty);
    if (isNaN(n)) return;

    setStock(prev => ({
      ...prev,
      [search]: (prev[search] ?? 0) + n,
    }));

    setSearch("");
    setQty("");
    searchRef.current?.focus();
  };

  /* Export Excel */
  const exportExcel = () => {
    const rows = PRODUCTS.map(name => ({
      Product: name,
      Quantity: stock[name] ?? 0,
    }));

    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Stock");
    XLSX.writeFile(wb, `Stock_${today}.xlsx`);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6 space-y-4">

        <button
          onClick={() => router.push("/")}
          className="text-blue-600 font-bold"
        >
          ← Back
        </button>

        <h1 className="text-xl font-bold text-center">
          New Stock Count ({today})
        </h1>

        {/* SEARCH */}
        <div className="relative">
          <input
            ref={searchRef}
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search battery name"
            className="w-full p-3 border rounded text-lg"
          />

          {results.length > 0 && (
            <div className="absolute w-full bg-white border rounded shadow mt-1 z-10">
              {results.map(r => (
                <div
                  key={r}
                  onClick={() => {
                    setSearch(r);
                    qtyRef.current?.focus();
                  }}
                  className="p-3 cursor-pointer hover:bg-blue-50"
                >
                  {r}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* QUANTITY */}
        <input
          ref={qtyRef}
          type="number"
          value={qty}
          onChange={e => setQty(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addCount()}
          placeholder="Quantity (+ / -)"
          className="w-full p-3 border rounded text-lg"
        />

        <button
          onClick={addCount}
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-bold"
        >
          ADD
        </button>

        <button
          onClick={exportExcel}
          className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-bold"
        >
          Export Excel
        </button>

      </div>
    </div>
  );
}