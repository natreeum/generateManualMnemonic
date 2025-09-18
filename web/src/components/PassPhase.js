function PassPhrase(props) {
  function onClickButton() {
    const input = document.getElementById("passphrase");
    props.setPassPhrase(input.value);
  }
  return (
    <div>
      <h1>3. 나만의 비밀구문으로 보안성 높이기(선택사항)</h1>
      <input
        id="passphrase"
        type="text"
        placeholder="나만의 비밀구문을 입력해 주세요."
        style={{ width: "300px" }}
        maxLength={100}
      />
      <button onClick={onClickButton}>적용하기</button>
      <ul>
        <li>
          비밀구문이 추가되면 니모닉으로 부터 생성되는 개인키가 달라집니다.
        </li>
        <li>
          비밀문구 길이에 제한은 없지만 타 지갑과의 호환성을 고려해 100자
          미만으로 설정하는것을 권장합니다.
        </li>
      </ul>
    </div>
  );
}

export default PassPhrase;
