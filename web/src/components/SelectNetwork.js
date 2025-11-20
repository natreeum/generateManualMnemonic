function SelectNetwork(props) {
  return (
    <div>
      <h1>4. 네트워크 선택</h1>
      {Object.entries({ BTC: 0, ETH: 60, XRP: 144 }).map(
        ([network, value], i) => (
          <button
            key={i}
            value={value}
            style={{ margin: "5px" }}
            onClick={() => props.setNetwork(value)}
            disabled={value == 60 ? false : true}
          >
            {network}
          </button>
        )
      )}
    </div>
  );
}

export default SelectNetwork;
