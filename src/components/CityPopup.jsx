import React, {useEffect, useState} from "react";

const CityPopup = ({getCityName, cb, value, setInputValue, closeModal, type = "find"}) => {
	const [showError, setShowError] = useState(false);
	const [icon, setIcon] = useState();

	useEffect(() => {
		switch (type) {
			case "find":
				setIcon(
					<svg className="svg svg--mini" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							className="svg__path"
							d="M6.5 13C2.9 13 0 10.1 0 6.5C0 2.9 2.9 0 6.5 0C10.1 0 13 2.9 13 6.5C13 10.1 10.1 13 6.5 13ZM6.5 1C3.45 1 1 3.45 1 6.5C1 9.55 3.45 12 6.5 12C9.55 12 12 9.55 12 6.5C12 3.45 9.55 1 6.5 1Z"
							fill="white"
						/>
						<path className="svg__path" d="M11.5 10.5L16 15.5L15 16.5L10.5 11.5L11.5 10.5Z" fill="white" />
						<path className="svg__path" d="M6.5 2.56647C8.66285 2.56647 10.1768 4.20632 10.3931 5.61192" stroke="white" strokeLinecap="round" />
					</svg>
				);
				break;
			case "add":
				setIcon(
					<svg className="svg svg--mini" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
						<path className="svg__path" d="M7.75 2.75V12.75M12.75 7.75H2.75H12.75Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				);
				break;
		}
	}, []);

	return (
		<form
			onSubmit={async e => {
				e.preventDefault();
				const localResult = await getCityName(e);
				if (typeof localResult === "object") setShowError(localResult.error);
				else {
					cb();
					closeModal(e, true);
				}
			}}
			className="modal__window"
		>
			<div className="input-cnt">
				<input className="modal__input" type="text" placeholder="City name" value={value} onChange={e => setInputValue(e.target.value)} />
				<span className={`error-text ${showError ? "error-text--show" : ""}`}>{"" + showError}</span>
			</div>

			<button className="option-button">{icon}</button>
		</form>
	);
};

export default CityPopup;
