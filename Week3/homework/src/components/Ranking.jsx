import { useEffect, useState } from "react";

const Ranking = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("rankings") || "[]");
    const sorted = saved.sort((a, b) => a.clearTime - b.clearTime);
    setRecords(sorted);
  }, []);

  const resetRecords = () => {
    localStorage.removeItem("rankings");
    setRecords([]);
  };

  return (
    <div className="h-full w-full bg-blue-50 rounded-2xl p-8 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-900">🏆 랭킹 보드</h2>
        <button
          onClick={resetRecords}
          className="bg-red-200 hover:bg-red-300 text-red-700 text-sm px-3 py-1 rounded-md shadow-sm"
        >
          기록 초기화
        </button>
      </div>

      {records.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
          아직 클리어 기록이 없습니다.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-blue-100 shadow-md overflow-hidden">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-blue-100 text-blue-900">
              <tr>
                <th className="py-3 px-4 text-left w-15">순위</th>
                <th className="py-3 px-4 text-left w-20">레벨</th>
                <th className="py-3 px-4 text-left w-30">클리어 시간(초)</th>
                <th className="py-3 px-4 text-left">기록 시각</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r, i) => (
                <tr
                  key={r.id}
                  className="border-t border-blue-50 hover:bg-blue-50 transition-colors"
                >
                  <td className="py-2 px-4 text-gray-700">{i + 1}</td>
                  <td className="py-2 px-4 text-gray-700">Level {r.level}</td>
                  <td className="py-2 px-4 text-gray-700 font-medium">
                    {r.clearTime.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 text-gray-500 text-xs">{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Ranking;
