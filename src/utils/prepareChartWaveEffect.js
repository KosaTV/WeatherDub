const prepareChartWaveEffect = dataObject => {
	return {
		data: {
			labels: [0, ...dataObject.temperatures, 0],
			datasets: [
				{
					label: "",
					data: [dataObject.maxTemp / 2, ...dataObject.temperaturesForChart, dataObject.maxTemp / 2],
					pointBorderWidth: 0,
					tension: 0.6,
					fill: true,
					showLine: true,
					pointRadius: 0,
					backgroundColor: "rgb(255,255,255)",
					borderColor: "rgba(0,0,0,.02)",
					datalabels: {
						formatter: (value, context) => {
							return dataObject.labelTemps[context.dataIndex];
						},
						anchor: "end",
						align: "top",
						offset: 12,
						color: "white",
						font: {
							size: 15,
							weight: "600"
						}
					}
				}
			]
		},
		height: 210,
		width: 400,
		options: {
			layout: {
				autoPadding: false,
				padding: {
					top: 30,
					bottom: -8
				}
			},
			maintainAspectRatio: false,
			scales: {
				xAxes: {
					title: {
						display: false
					},
					beginAtZero: false,
					grid: {
						display: false,
						drawBorder: false
					},
					ticks: {
						display: false
					}
				},
				yAxes: {
					min: 0,
					max: dataObject.maxTemp * 1.35,
					title: {
						display: false
					},
					ticks: {display: false, beginAtZero: false, stepSize: 1},
					grid: {
						display: false,
						drawTicks: false,
						drawBorder: false
					}
				}
			},
			plugins: {
				legend: {display: false},
				tooltip: {
					enabled: false
				}
			}
		}
	};
};

export default prepareChartWaveEffect;
