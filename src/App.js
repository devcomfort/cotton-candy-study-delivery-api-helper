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

function App() {
	const API_KEY = process.env.REACT_APP_API_KEY;
	const [company, setCompany] = useState([]);

	const [location, setLocation] = useState({});
	const [billing, setBilling] = useState();
	const [choice, setChoice] = useState();
	const getCompany = async () => {
		const res = await fetch(
			`https://info.sweettracker.co.kr/api/v1/companylist?t_key=${API_KEY}`
		);
		const json = await res.json();
		setCompany(json.Company);

		console.log(json.Company);
		setChoice(json.Company[0].Code);
	};
	useEffect(() => {
		getCompany();
		// eslint-disable-next-line
	}, []);

	// location observer
	useEffect(() => {
		console.log(`location is`, location);
	}, [location]);

	return (
		<div className="App">
			<MenuBox>
				<MenuTitle>메인메뉴</MenuTitle>
				<SubTitle>조회할 택배사를 고른 후 운송장 번호를 기입하시오</SubTitle>
				<CompanyList
					onInput={(e) => {
						const value = e.target.value;
						console.log(`setChoice to ${value}`);
						setChoice(value);
						return value;
					}}
				>
					{company.map((name, i) => {
						return (
							<option key={i} value={name.Code} selected={choice.Code === name}>
								{name.Name}
							</option>
						);
					})}
				</CompanyList>
				<BillingInput
					type="text"
					placeholder="운송장 번호를 입력하시오"
					onInput={(e) => {
						console.log(`setBilling to ${e.target.value}`);
						setBilling(e.target.value);
					}}
				></BillingInput>
				<SubmitBtn
					onClick={() =>
						fetch(
							`https://info.sweettracker.co.kr/api/v1/trackingInfo?t_code=${choice}&t_invoice=${billing}&t_key=${API_KEY}`
						)
							.then((response) => response.json())
							.then((json) => {
								setLocation(json);
							})
					}
				>
					운송장 조회
				</SubmitBtn>
			</MenuBox>
		</div>
	);
}

export default App;
