import { useState } from "react";
import Gameboard from "./components/Gameboard";
import Header from "./components/Header";
import Ranking from "./components/Ranking";

function App() {
  const [activeTab, setActiveTab] = useState("game");

  return (
    <>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="p-6">
        {activeTab === "game" && <Gameboard />}
        {activeTab === "ranking" && <Ranking />}
      </main>
    </>
  );
}

export default App;
