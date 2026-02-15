import React from "react";
import SectionHeader from "../SectionHeader";
import StatLargeRow from "../StatLargeRow";

const VisaoColuna = ({ ultimos100 }) => {
    return (
        <div className="space-y-6 animate-fade-in">
            <SectionHeader title="Análise de Colunas" badge="VANTAGEM ESTATÍSTICA" />
            <div className="grid grid-cols-1 gap-6 bg-white/5 p-8 rounded-3xl border border-white/20">
                <StatLargeRow label="Coluna 1" results={ultimos100} type="coluna" color="bg-red-500" />
                <StatLargeRow label="Coluna 2" results={ultimos100} type="coluna" color="bg-blue-500" />
                <StatLargeRow label="Coluna 3" results={ultimos100} type="coluna" color="bg-[#00D837]" />
            </div>
        </div>
    );
};

export default VisaoColuna;
