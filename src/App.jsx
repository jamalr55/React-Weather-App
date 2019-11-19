import React, { Component } from 'react';

import './sass/app.scss';

import TopSection from './components/top/index';

import axios from 'axios';

const WEATHER_KEY = '4337eeea324b85003a12b13aaf71ee41';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cityName: 'Houston',
			numForcastDays: 4,
			isLoading: true
		};
	}

	updateWeather() {
		const { cityName } = this.state;
		const URL = `http://api.weatherstack.com/current?access_key=${WEATHER_KEY}&query=${cityName}`;
		axios
			.get(URL)
			.then(res => {
				return res.data;
			})
			.then(data => {
				this.setState({
					isLoading: false,
					temp_c: data.current.temperature,
					isDay: data.location.localtime,
					text: data.current.weather_descriptions,
					iconURL: data.current.weather_icons,
					precipitation: data.current.precip,
					humidity: data.current.humidity,
					wind: data.current.wind_speed,
					feelsLike: data.current.feelslike
				});
			})
			.catch(err => {
				if (err) console.error('Cannot fetch Weather Data from API, ', err);
			});
	}

	componentDidMount() {
		const { eventEmitter } = this.props;

		this.updateWeather();

		eventEmitter.on('updateWeather', data => {
			this.setState({ cityName: data }, () => this.updateWeather());
			console.log('LocationName:', data);
		});
	}

	render() {
		const {
			isLoading,
			cityName,
			temp_c,
			isDay,
			text,
			iconURL,
			precipitation,
			humidity,
			wind,
			feelsLike
		} = this.state;

		return (
			<div className='app-container'>
				<div className='main-container'>
					{isLoading && <h3>Loading Weather...</h3>}
					{!isLoading && (
						<div className='top-section'>
							<TopSection
								location={cityName}
								temp_c={temp_c}
								isDay={isDay}
								text={text}
								iconURL={iconURL}
								eventEmitter={this.props.eventEmitter}
								precipitation={precipitation}
								humidity={humidity}
								wind={wind}
								feelsLike={feelsLike}
							/>
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default App;

// apixu.com = weatherstack.com

// https://weatherstack.com/documentation
