import "./App.css";
import { useEffect, useState } from "react";

function App() {
  // const API_KEY = "04j6E74Vs2lH7YDeGGqPdQ";

  const API_KEY = process.env.REACT_APP_API_KEY;
  const [company, setCompany] = useState([]);
  const getCompany = async () => {
    console.log(API_KEY);
    const res = await fetch(`https://info.sweettracker.co.kr/api/v1/companylist?t_key=${API_KEY}`);
    const json = await res.json();
    setCompany(json.Company);
  };
  useEffect(() => {
    getCompany();
  }, []);

  return (
    <div className="App">
      <div className="wrap">
        <div className="menu-box">
          <h3 className="menu-title">메인메뉴</h3>
          <p className="menu-sub">조회할 택배사를 고른 후 운송장 번호를 기입하시오</p>
        </div>
        <select className="companylist">
          {company.map((name, i) => {
            return <option key={i}>{name.Name}</option>;
          })}
        </select>
        <form className="waybill" method="get">
          <input type="text" placeholder="운송장 번호를 입력하시오"></input>
          <div>
            <button className="btn">운송장 조회</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
