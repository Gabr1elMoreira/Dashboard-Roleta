export const API_URL = process.env.NODE_ENV === 'development'
    ? "http://localhost:4000"
    : "https://dashboard-roleta.onrender.com";

export const CORES_CAMUFLADO = [
    "#FF0000", "#f97316", "#facc15", "#00D837",
    "#14b8a6", "#2563eb", "#1e3a8a", "#8b5cf6", "#ec4899"
];

export const CORES_BARRAS_STATS = [
    "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-[#00D837]",
    "bg-teal-500", "bg-blue-500", "bg-blue-900", "bg-purple-500", "bg-pink-500"
];
