import bitsByWordsCount from "../static/bitsByWordCount.json";

function Entropy({ diceNumbers, setDiceNumbers, wordsCount }) {
  function calculateMadeEntropyLength() {
    return diceNumbers.map((e) => (Number(e) - 1).toString(2)).join("").length;
  }
  function onClickNumberButton(event) {
    if (calculateMadeEntropyLength() >= bitsByWordsCount[wordsCount]) {
      return;
    }
    diceNumbers.push(event.target.value);
    setDiceNumbers([...diceNumbers]);
  }

  function onClickAutoFillButton() {
    function rollDice() {
      return Math.floor(Math.random() * 6) + 1;
    }
    while (calculateMadeEntropyLength() < bitsByWordsCount[wordsCount]) {
      diceNumbers.push(rollDice());
    }
    setDiceNumbers([...diceNumbers]);
  }
  return (
    <div>
      <h1>2. 나만의 엔트로피 생성하기</h1>
      <div>실제 주사위를 굴려서 나온 숫자들을 선택해 주세요.</div>
      <div style={{ fontSize: "12px", margin: "10px 0" }}>
        단어 생성을 위한 충분한 엔트로피가 생성되면, 더이상 주사위를 굴려도
        의미가 없습니다.
      </div>
      <div>
        {[1, 2, 3, 4, 5, 6].map((e, i) => (
          <button
            value={e}
            key={i}
            onClick={onClickNumberButton}
            style={{ margin: "5px", width: "50px", height: "50px" }}
          >
            {e}
          </button>
        ))}
      </div>
      <div>
        <button
          onClick={() => {
            setDiceNumbers([]);
          }}
          style={{ margin: "10px" }}
        >
          다시하기
        </button>
        <button onClick={onClickAutoFillButton} style={{ margin: "10px" }}>
          나머지 자동으로 채우기
        </button>
      </div>
    </div>
  );
}

export default Entropy;
