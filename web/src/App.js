import Entropy from "./components/Entropy";
import WordsCount from "./components/WordsCount";

import "./App.css";

import { useState } from "react";
import Status from "./components/Status";

function App() {
  const [wordsCount, setWordsCount] = useState(24);
  const [diceNumbers, setDiceNumbers] = useState([]);

  return (
    <div className="container">
      <div className="left-panel">
        <WordsCount setWordsCount={setWordsCount} />
        <Entropy
          diceNumbers={diceNumbers}
          setDiceNumbers={setDiceNumbers}
          wordsCount={wordsCount}
        />
      </div>
      <div className="right-panel">
        <Status wordsCount={wordsCount} diceNumbers={diceNumbers} />
      </div>
    </div>
  );
}

export default App;
