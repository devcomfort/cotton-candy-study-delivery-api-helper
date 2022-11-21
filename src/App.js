import "./App.css";
import { useEffect, useState } from "react";
import styled from "styled-components";

const MenuBox = styled.div`
  width: 550px;
  height: 500px;
  max-width: 550px;
  background-color: antiquewhite;
  text-align: center;
  border-radius: 5px;
`;

const MenuTitle = styled.div`
  margin: 20px 0 10px 0;
  color: black;
  font-size: 25px;
  font-weigth: bold;
`;

const SubTitle = styled.div`
  color: black;
  font-size: 17px;
`;

const CompanyList = styled.select`
  width: 400px;
  height: 45px;
  margin-top: 30px;
  border: none;
  border-radius: 5px;
  text-align: center;
`;

const BillingInput = styled.input`
  width: 400px;
  width: 400px;
  height: 45px;
  margin-top: 30px;
  border: none;
  border-radius: 5px;
  text-align: center;
`;

const SubmitBtn = styled.button`
  width: 100px;
  height: 35px;
  margin: 30px auto;
  border: none;
  border-radius: 5px;
  text-align: center;
  display: block;
`;

function App() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [company, setCompany] = useState([]);
  const [billing, setBilling] = useState();
  const [choice, setChoice] = useState();
  const [modal, setModal] = useState(false);
  const getCompany = async () => {
    const res = await fetch(`https://info.sweettracker.co.kr/api/v1/companylist?t_key=${API_KEY}`);
    const json = await res.json();
    setCompany(json.Company);
  };
  useEffect(() => {
    getCompany();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      {modal === true ? <Modal modal={modal} /> : null}
      <MenuBox>
        <MenuTitle>메인메뉴</MenuTitle>
        <SubTitle>조회할 택배사를 고른 후 운송장 번호를 기입하시오</SubTitle>
        <CompanyList className="companylist" onChange={(e) => setChoice(e.target.value)} value={choice}>
          {company.map((name, i) => {
            return (
              <option key={i} value={name.Code}>
                {name.Name}
              </option>
            );
          })}
        </CompanyList>
        <BillingInput
          type="text"
          placeholder="운송장 번호를 입력하시오"
          onInput={(e) => {
            setBilling(e.target.value);
          }}
        ></BillingInput>
        <SubmitBtn
          className="btn"
          onClick={(e) => {
            e.preventDefault();
            return billing === undefined ? setModal(true) : setModal(false);
          }}
        >
          운송장 조회
        </SubmitBtn>
      </MenuBox>
      <div></div>
    </div>
  );
}

function Modal(props) {
  return (
    <div className="modal">
      <h5>운송장번호를 공백으로 기입하시면 안됩니다.</h5>
    </div>
  );
}

export default App;
