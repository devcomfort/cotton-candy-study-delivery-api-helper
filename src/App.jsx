import "./App.css";
import { useEffect, useState } from "react";

function App() {
	const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
	const [company, setCompany] = useState([]);
	const [billing, setBilling] = useState();
	const [choice, setChoice] = useState();
	const [modal, setModal] = useState(false);
	const getCompany = async () => {
		const res = await fetch(
			`https://info.sweettracker.co.kr/api/v1/companylist?t_key=${API_KEY}`
		);
		const json = await res.json();
		setCompany(json.Company);
	};
	useEffect(() => {
		getCompany();
		// eslint-disable-next-line
	}, []);

	const handleSelect = (e) => setChoice(e.target.value);

	return (
		<div className="App">
			{/* {modal === true ? <Modal /> : null} */}
			<div className="wrap">
				<div className="menu-box">
					<h1 className="menu-title">메인메뉴</h1>
					<p className="menu-sub">
						조회할 택배사를 고른 후 운송장 번호를 기입하시오
					</p>
				</div>
				<select className="companylist" onChange={handleSelect} value={choice}>
					{company.map((name, i) => {
						return (
							<option key={i} value={name.Code}>
								{name.Name}
							</option>
						);
					})}
				</select>
				<form
					className="waybill"
					// action={`https://info.sweettracker.co.kr/api/v1/trackingInfo?t_code=${choice}&t_invoice=${billing}&t_key=${API_KEY}`}
					// method="post"
				>
					<input
						type="text"
						placeholder="운송장 번호를 입력하시오"
						onInput={(e) => {
							setBilling(e.target.value);
						}}
					></input>
					<div>
						<button
							className="btn"
							onClick={(e) => {
								e.preventDefault();
								return billing === "" ? setModal(false) : setModal(true);
							}}
						>
							운송장 조회
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

function Modal() {
	return (
		<div className="modal">
			<h5>운송장번호를 공백으로 기입하시면 안됩니다.</h5>
		</div>
	);
}

export default App;
