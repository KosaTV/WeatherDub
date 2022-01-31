import ReactDOM from "react-dom";
import StyledWeatherCnt from "./components/styled/WeatherCnt.styled";
import GlobalStyle from "./components/styled/GlobalStyle";
import {WeatherProvider} from "./contexts/WeatherProvider";
import {OptionsProvider} from "./contexts/OptionsProvider";
import DocumentHeader from "./components/DocumentHeader";

const App = () => {
	return (
		<OptionsProvider>
			<WeatherProvider>
				<GlobalStyle />
				<DocumentHeader />
				<StyledWeatherCnt />
			</WeatherProvider>
		</OptionsProvider>
	);
};

ReactDOM.render(<App />, document.querySelector("#root"));
