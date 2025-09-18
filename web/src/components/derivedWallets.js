import bitsByWordsCount from "../static/bitsByWordCount.json";
import { ethers } from "ethers";

export default function DerivedWallets({
  diceNumbers,
  passPhrase,
  wordsCount,
}) {
  function getBitString() {
    return diceNumbers
      .map((e) => (Number(e) - 1).toString(2))
      .join("")
      .slice(0, bitsByWordsCount[wordsCount]);
  }
  function finalBitsToWords() {
    const finalBits = getBitString();

    if (bitsByWordsCount[wordsCount] > finalBits.length) {
      return {
        success: false,
        mnemonic: "지갑을 생성할 수 없습니다.",
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
    return { success: true, mnemonic };
  }
  return (
    <div>
      <h1>생성된 지갑 목록(10개)</h1>
      <ul>
        {finalBitsToWords().success ? (
          Array(10)
            .fill(0)
            .map((_, i) => {
              const wallet = ethers.HDNodeWallet.fromMnemonic(
                finalBitsToWords().mnemonic,

                `m/44'/60'/0'/0/${i}`
              );
              return (
                <li key={i}>
                  {`m/44'/60'/0'/0/${i}`}
                  <br />
                  Address : {wallet.address} <br />
                  Public Key : {wallet.publicKey} <br />
                  Private Key : {wallet.privateKey}
                </li>
              );
            })
        ) : (
          <li>{finalBitsToWords().mnemonic}</li>
        )}
      </ul>
    </div>
  );
}
