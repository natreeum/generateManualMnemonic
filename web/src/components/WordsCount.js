function WordsCount(props) {
  return (
    <div>
      <h1>1. 니모닉 구문 단어 개수 정하기</h1>
      <div>니모닉 구문을 구성할 단어의 개수를 선택해 주세요 :</div>
      {[12, 15, 18, 21, 24].map((count) => (
        <button
          key={count}
          value={count}
          style={{ margin: "5px" }}
          onClick={() => props.setWordsCount(count)}
        >
          {count} words
        </button>
      ))}
    </div>
  );
}

export default WordsCount;
