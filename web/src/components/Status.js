import bitsByWordsCount from "../static/bitsByWordCount.json";
import { SHA256 } from "crypto-js";
import { ethers } from "ethers";

export default function Status({ wordsCount, diceNumbers, passPhrase }) {
  function getBitString() {
    return diceNumbers
      .map((e) => (Number(e) - 1).toString(2))
      .join("")
      .slice(0, bitsByWordsCount[wordsCount]);
  }
  function calculateChecksum() {
    const bits = getBitString();

    const bytes = [];
    for (let i = 0; i < bits.length; i += 8) {
      // 8bit(1byte) 단위로 자르기
      const byte = bits.slice(i, i + 8);
      bytes.push(parseInt(byte, 2));
    }

    // Buffer로 변환
    const entropy = new Uint8Array(bytes);

    // Checksum 계산
    const hash = SHA256(entropy);
    const checksumLength = (entropy.length * 8) / 32;
    const checksum = parseInt(hash, 16)
      .toString(2) // 2진수 변환
      .padStart(256, "0") // 256자리로 맞춤
      .slice(0, checksumLength); // 앞의 checksumLength 개수만큼

    return checksum;
  }

  function finalBitsToWords() {
    const finalBits = getBitString();

    if (bitsByWordsCount[wordsCount] > finalBits.length) {
      return {
        success: false,
        mnemonic: "엔트로피가 충분하지 않습니다. 주사위를 더 굴려주세요",
      };
    }

    // bits to bytes
    const bytes = [];

    for (let i = 0; i < finalBits.length; i += 8) {
      // 8bit(1byte) 단위로 자르기
      const byte = finalBits.slice(i, i + 8);
      bytes.push(byte);
    }

    const mnemonic = ethers.Mnemonic.fromEntropy(
      new Uint8Array(bytes),
      passPhrase
    );
    return { success: true, mnemonic: mnemonic.phrase };
  }

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
        <p
          style={{
            fontSize: "10px",
            width: "30%",
            // 128글자가 넘어가면 줄바꿈
            wordBreak: "break-all",
          }}
        >
          {diceNumbers.length == 0 ? "-" : getBitString()}
        </p>
      </div>
      <div>
        <h2>Checksum</h2>
        <p style={{ fontSize: "10px" }}>
          {calculateChecksum().length === 0 ? "-" : calculateChecksum()}
        </p>
      </div>
      <div>
        <h2>Mnemonic Words</h2>
        <div style={{ width: " 50%" }}>
          {finalBitsToWords().success === false
            ? finalBitsToWords().mnemonic
            : finalBitsToWords()
                .mnemonic.split(" ")
                .map((word, index, array) => {
                  if (index < array.length / 2) {
                    return (
                      <span
                        key={index}
                        style={{ display: "inline-block", width: "50%" }}
                      >
                        {index + 1}. {word}
                      </span>
                    );
                  } else {
                    return (
                      <span
                        key={index}
                        style={{ display: "inline-block", width: "50%" }}
                      >
                        {index + 1}. {word}
                      </span>
                    );
                  }
                })}
        </div>
      </div>
    </div>
  );
}
