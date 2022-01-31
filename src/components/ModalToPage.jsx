import ReactDOM from "react-dom";

const ModalToPage = ({setOpen, Popup}) => {
	const closeModal = (e, require = false) => {
		if (e.target.classList.contains("modal") || e.target.closest(".modal__close") || require) setOpen(false);
	};

	return ReactDOM.createPortal(
		<div className="modal" onClick={closeModal}>
			<Popup.Component {...Popup.values} closeModal={closeModal} />
		</div>,
		document.querySelector(".page")
	);
};

export default ModalToPage;
