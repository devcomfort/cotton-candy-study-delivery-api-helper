import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const api = "04j6E74Vs2lH7YDeGGqPdQ";
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState([]);
  const [choice, setChoice] = useState("");
  const [location, setLocation] = useState([]);
  const [billing, setBilling] = useState();
  const [count, setCount] = useState(0);
  const getCompany = async () => {
    const res = await fetch(`https://info.sweettracker.co.kr/api/v1/companylist?t_key=${api}`);
    const json = await res.json();
    setCompany(json.Company);
    setLoading(false);
  };
  useEffect(() => {
    getCompany();
  }, []);
  console.log(company);

  return (
    <div className="App">
      {/* <form action="http://info.sweettracker.co.kr/tracking/1" method="post">
        <div className="form-group" style={{ display: "none" }}>
          <label for="t_key">API key</label>
          <input type="text" className="form-control" id="t_key" name="t_key" value={api} />
        </div>
        <div className="form-group">
          <label for="t_code">택배사 코드</label>
          <input type="text" className="form-control" name="t_code" id="t_code" />
        </div>
        <div className="form-group">
          <label for="t_invoice">운송장 번호</label>
          <input type="text" className="form-control" name="t_invoice" id="t_invoice" />
        </div>
        <button type="submit" className="btn btn-default">
          조회하기
        </button>
      </form> */}
      {/* {loading ? <h1>데이터 정보를 불러오는 중...</h1> : null} */}
      <div className="wrap">
        <div className="menu-box">
          <h3 className="menu-title">메인메뉴</h3>
          <p className="menu-sub">조회할 택배사를 고른 후 운송장 번호를 기입하시오</p>
        </div>
        <select
          className="companylist"
          onChange={(e) => {
            let copy = [...e.target.value];
            setChoice(copy);
            console.log(`${copy}, ${e.target.value}`);
          }}
        >
          {company.map((name, i) => (
            <option key={i}>{name.Name}</option>
          ))}
        </select>

        <form className="waybill">
          <input
            type="text"
            placeholder="운송장 번호를 입력하시오"
            onInput={(e) => {
              setBilling(e.target.value);
            }}
          ></input>
        </form>

        <button className="btn">운송장 조회</button>
      </div>
    </div>
  );
}

export default App;
