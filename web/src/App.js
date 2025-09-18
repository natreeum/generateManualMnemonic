import "./App.css";

import Entropy from "./components/Entropy";
import WordsCount from "./components/WordsCount";
import PassPhrase from "./components/PassPhase";
import Status from "./components/Status";
import DerivedWallets from "./components/derivedWallets";

import { useState } from "react";

function App() {
  const [wordsCount, setWordsCount] = useState(24);
  const [diceNumbers, setDiceNumbers] = useState([]);
  const [passPhrase, setPassPhrase] = useState("");

  return (
    <div className="container">
      <div className="upper-panel">
        <div className="upper-left-panel">
          <Status
            wordsCount={wordsCount}
            diceNumbers={diceNumbers}
            passPhrase={passPhrase}
          />
        </div>
        <div className="upper-right-panel">
          <DerivedWallets
            diceNumbers={diceNumbers}
            passPhrase={passPhrase}
            wordsCount={wordsCount}
          />
        </div>
      </div>
      <div className="lower-panel">
        <WordsCount setWordsCount={setWordsCount} />
        <Entropy
          diceNumbers={diceNumbers}
          setDiceNumbers={setDiceNumbers}
          wordsCount={wordsCount}
        />
        <PassPhrase setPassPhrase={setPassPhrase} />
      </div>
    </div>
  );
}

export default App;
