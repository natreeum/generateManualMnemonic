const dice = require("./dice");
const fs = require("fs");

const crypto = require("crypto");

const wordlist = fs.readFileSync("./bip-0039/english.txt", "utf-8").split("\n");

// 숫자를 3bit 이진수로 변환
function numberToBit(num) {
  return num.toString(2);
}

function main() {
  // 주사위를 던진 횟수
  let eventCount = 0;

  // 최종 비트 문자열
  let bits = "";
  while (bits.length < 256) {
    const num = dice(6) - 1;

    // bit = "0" ~ "101"
    let bit = numberToBit(num);

    bits += bit.toString();
    eventCount++;
  }
  console.log("주사위 던진 횟수 : ", eventCount);

  console.log("비트 문자열 길이 : ", bits.length);

  // 256bit 이상 자리수 자르기
  bits = bits.slice(0, 256);
  console.log("비트 문자열 자른 후 길이 : ", bits.length);

  const bytes = [];
  for (let i = 0; i < bits.length; i += 8) {
    // 8bit(1byte) 단위로 자르기
    const byte = bits.slice(i, i + 8);
    bytes.push(parseInt(byte, 2));
  }

  // Buffer로 변환
  const entropy = Buffer.from(bytes);

  // Checksum 계산
  const hash = crypto.createHash("sha256").update(entropy).digest("hex");
  const checksumLength = (entropy.length * 8) / 32;
  const checksum = parseInt(hash, 16)
    .toString(2)
    .padStart(256, "0")
    .slice(0, checksumLength); // 앞의 checksumLength 개수만큼

  // 최종 비트 문자열
  const finalBits = bits + checksum;
  console.log("최종 비트 문자열 길이 : ", finalBits.length);

  // 11bit 단위로 자르기
  const words = [];
  for (let i = 0; i < finalBits.length; i += 11) {
    const index = parseInt(finalBits.slice(i, i + 11), 2);
    words.push(index);
  }

  console.log("단어 개수 : ", words.length);

  const mnemonicWords = [];
  const mnemonicWordIndexes = [];

  for (let i = 0; i < words.length; i++) {
    mnemonicWords.push(wordlist[words[i]]);
    mnemonicWordIndexes.push(words[i]);
  }

  console.log(
    mnemonicWords
      .map((e, i) => {
        return `${i + 1}. ${e} ${mnemonicWordIndexes[i]}`;
      })
      .join("\n")
  );

  // seed = mnemonic + passphrase(optional), PBKDF2, 2048 rounds, HMAC-SHA512, 512bits
  const mnemonic = mnemonicWords.join(" ");
  const passphrase = "myPassphrase";

  const salt = "mnemonic" + passphrase;

  const seed = crypto.pbkdf2Sync(mnemonic, salt, 2048, 64, "sha512");
  const seedStr = seed.toString("hex");
  console.log("seed : ", seedStr);

  const masterPrivateKey = seed.subarray(0, 32).toString("hex");
  const masterChainCode = seed.subarray(32).toString("hex");

  console.log("masterPrivateKey : ", masterPrivateKey);
  console.log("masterChainCode : ", masterChainCode);

  const derivationPath = "m/44'/0'/0'/0/0";
}
main();
