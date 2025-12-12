import { useState } from "react";
import Gameboard from "./components/Gameboard";
import Header from "./components/Header";
import Ranking from "./components/Ranking";

function App() {
  const [activeTab, setActiveTab] = useState("game");

  return (
    <div className="h-screen p-5 flex justify-center">
      <div className="flex flex-col items-center h-full w-full max-w-[1440px]">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex flex-1 overflow-auto pt-4 w-full">
          {activeTab === "game" && <Gameboard />}
          {activeTab === "ranking" && <Ranking />}
        </main>
      </div>
    </div>
  );
}

export default App;
