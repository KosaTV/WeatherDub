const setErrorText = code => {
	switch (code) {
		case 500:
			return "We can't connect with server, check the internet connection";
		case 404:
			return "City doesn't exist";
		case 400:
			return "Please, fill the field";
		default:
			return "Something went wrong, try refresh the page";
	}
};

export default setErrorText;
