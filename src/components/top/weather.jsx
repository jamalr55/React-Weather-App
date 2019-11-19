import React from "react";


export default class Weather extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { location, temp_c, text, iconURL, wind, humidity, precipitation, feelsLike } = this.props;


		return <div className="weather-container">
			<div className="header">{location}</div>
			<div className="inner-container">
				<div className="image">
					<img src={iconURL} />
				</div>
				<div className="current-weather">{temp_c}°</div>
			</div>
			<div className="footer">{text}</div>

			<div className="today-info">
				<div className="info">
					<div className="title2">Precipitation</div>
					<div className="value">{precipitation}%</div>
				</div>
				<div className="info">
					<div className="title2">Humidity</div>
					<div className="value">{humidity}%</div>
				</div>
				<div className="info">
					<div className="title2">Wind</div>
					<div className="value">{wind} kmph</div>
				</div>
				<div className="info">
					<div className="title2">Feels Like</div>
					<div className="value">{feelsLike}°</div>
				</div>
			</div>

		</div>
	}
}