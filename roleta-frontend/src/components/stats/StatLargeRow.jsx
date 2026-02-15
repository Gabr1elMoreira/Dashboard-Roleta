import React from "react";
import { determinarDuzia, determinarColuna } from "../../utils/estrategias";

const StatLargeRow = ({ label, results, type, color, count: manualCount, total: manualTotal }) => {
    const count = manualCount !== undefined ? manualCount : results.filter(r => {
        if (type === "duzia") return determinarDuzia(r.numero) === label;
        return determinarColuna(r.numero) === label;
    }).length;
    const totalValido = manualTotal !== undefined ? manualTotal : results.filter(r => r.numero !== 0).length;
    const percent = totalValido > 0 ? (count / totalValido) * 100 : 0;

    return (
        <div className="flex items-center gap-8 py-4 px-6 bg-white/5 rounded-2xl border border-white/5 mb-2 group hover:bg-white/10 transition-all">
            <div className="w-40">
                <span className="text-[15px] font-black text-white uppercase tracking-wider">{label}</span>
            </div>
            <div className="flex-1 h-5 bg-black/60 rounded-full overflow-hidden border border-white/10 shadow-inner max-w-md">
                <div className={`h-full ${color} rounded-full transition-all duration-[1200ms] ease-out shadow-[0_0_20px_rgba(255,255,255,0.2)]`} style={{ width: `${percent}%` }}></div>
            </div>
            <div className="flex-1 text-right">
                <span className="text-4xl font-black text-white tabular-nums tracking-tighter">{percent.toFixed(1)}<span className="text-sm text-white ml-1">%</span></span>
            </div>
        </div>
    );
};

export default StatLargeRow;
