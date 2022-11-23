import "./App.css";
import { useEffect, useState } from "react";
import styled from "styled-components";

const MenuBox = styled.div`
  width: 550px;
  height: 500px;
  max-width: 550px;
  background-color: antiquewhite;
  text-align: center;
  border-radius: 15px;
`;

const MenuTitle = styled.div`
  padding: 20px 0 10px 0;
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
  margin-top: 50px;
  border: none;
  border-radius: 5px;
  text-align: center;
`;

const BillingInput = styled.input`
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

const ModalBox = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  text-align: center;
  padding-top: 250px;
`;

const ModalText = styled.span`
  font-size: 30px;
  text-decoration: underline;
`;

function App() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [company, setCompany] = useState([]);
  const [location, setLocation] = useState([]);
  const [billing, setBilling] = useState();
  const [choice, setChoice] = useState();
  const [modal, setModal] = useState(false);
  const getCompany = async () => {
    const res = await fetch(`https://info.sweettracker.co.kr/api/v1/companylist?t_key=${API_KEY}`);
    const json = await res.json();
    setCompany(json.Company);
  };
  const billingData = async () => {
    const res = await fetch(`https://info.sweettracker.co.kr/api/v1/trackingInfo?t_code=${choice}&t_invoice=${billing}&t_key=${API_KEY}`);
    const json = await res.json();
    console.log(json);
    setLocation(json);
    console.log(location);
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
        <CompanyList
          onInput={(e) => {
            const value = e.target.value;
            setChoice(value);
            return value;
          }}
        >
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
        <SubmitBtn onClick={(e) => billingData()}>운송장 조회</SubmitBtn>
      </MenuBox>
    </div>
  );
}

function Modal(props) {
  return (
    <ModalBox>
      <ModalText>운송장번호를 공백으로 기입하시면 안됩니다.</ModalText>
    </ModalBox>
  );
}
export default App;
