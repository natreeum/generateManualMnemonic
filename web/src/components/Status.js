import bitsByWordsCount from "../static/bitsByWordCount.json";

export default function Status({ wordsCount, diceNumbers }) {
  function getBitString() {
    return diceNumbers
      .map((e) => (Number(e) - 1).toString(2))
      .join("")
      .slice(0, bitsByWordsCount[wordsCount]);
  }
  // function calculateChecksum() {
  //   const bits = getBitString();

  //   const bytes = [];
  //   for (let i = 0; i < bits.length; i += 8) {
  //     // 8bit(1byte) 단위로 자르기
  //     const byte = bits.slice(i, i + 8);
  //     bytes.push(parseInt(byte, 2));
  //   }

  //   // Buffer로 변환
  //   const entropy = Buffer.from(bytes);

  //   // Checksum 계산
  //   const hash = crypto.createHash("sha256").update(entropy).digest("hex");
  //   const checksumLength = (entropy.length * 8) / 32;
  //   const checksum = parseInt(hash, 16)
  //     .toString(2)
  //     .padStart(256, "0")
  //     .slice(0, checksumLength); // 앞의 checksumLength 개수만큼

  //   return checksum;
  // }
  return (
    <div>
      <h1>현재 상태</h1>
      <p>총 [{wordsCount}] 개의 단어</p>
      <div>
        <h2>주사위 굴림</h2>
        <p>총 굴린 횟수 : {diceNumbers.length}</p>
        <p>마지막 10개 주사위</p>
        <p>
          {">"} {diceNumbers.slice(-10).join(", ")}
        </p>
      </div>
      <div>
        <h2>숫자별 분포</h2>
        <div>
          {Array.from({ length: 6 }, (_, i) => (
            <p key={i}>
              [{i + 1}]{" "}
              {Array.from({
                length: diceNumbers.filter((num) => {
                  return num == i + 1;
                }).length,
              })
                .map(() => "*")
                .join("")}
            </p>
          ))}
        </div>
      </div>
      <div>
        <h2>생성된 엔트로피</h2>
        <p style={{ width: "100%", wordBreak: "break-all" }}>
          {getBitString()}
        </p>
      </div>
      <div>
        <h2>Checksum</h2>
        {/* <p>{calculateChecksum()}</p> */}
      </div>
    </div>
  );
}
