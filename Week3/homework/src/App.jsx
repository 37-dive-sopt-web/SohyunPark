import { useState } from "react";
import Gameboard from "./components/Gameboard";
import Header from "./components/Header";
import Ranking from "./components/Ranking";

function App() {
  const [activeTab, setActiveTab] = useState("game");

  return (
    <div className="flex flex-col h-screen p-5">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-auto pt-4">
        {activeTab === "game" && <Gameboard />}
        {activeTab === "ranking" && <Ranking />}
      </main>
    </div>
  );
}

export default App;
