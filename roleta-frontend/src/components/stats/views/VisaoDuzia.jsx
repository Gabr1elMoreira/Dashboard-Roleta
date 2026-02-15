import React from "react";
import SectionHeader from "../SectionHeader";
import StatLargeRow from "../StatLargeRow";

const VisaoDuzia = ({ ultimos100 }) => {
    return (
        <div className="space-y-6 animate-fade-in">
            <SectionHeader title="Análise de Dúzias" badge="VANTAGEM ESTATÍSTICA" />
            <div className="grid grid-cols-1 gap-6 bg-white/5 p-8 rounded-3xl border border-white/20">
                <StatLargeRow label="1ª Dúzia" results={ultimos100} type="duzia" color="bg-red-500" />
                <StatLargeRow label="2ª Dúzia" results={ultimos100} type="duzia" color="bg-blue-500" />
                <StatLargeRow label="3ª Dúzia" results={ultimos100} type="duzia" color="bg-[#00D837]" />
            </div>
        </div>
    );
};

export default VisaoDuzia;
