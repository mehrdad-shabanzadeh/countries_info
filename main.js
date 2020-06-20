$(document).ready(function () {
	// request for country
	$.ajax({
		url: 'https://restcountries.eu/rest/v2/all',
		type: 'GET',
		success: function (countryResponse) {
			// console.log(countryResponse);
			for (let i = 0; i < countryResponse.length; i++) {
				$('#country-list').append(`<option value="${i}">${countryResponse[i].name}</option>`);
			}

			$('#country-list').on('change', function () {
				let selectedCountryValue = $('#country-list :selected').val();
				// console.log(selectedCountryValue);
				$('#country-info-box p').css('color', 'yellow');
				$('#country-name').html(countryResponse[selectedCountryValue].name);
				$('#native-name').html(` ${countryResponse[selectedCountryValue].nativeName}`);
				$('#capital').html(countryResponse[selectedCountryValue].capital);
				$('#region').html(`${countryResponse[selectedCountryValue].region}, ${countryResponse[selectedCountryValue].subregion}`);
				$('#population').html(countryResponse[selectedCountryValue].population);
				$('#languages').html(`${countryResponse[selectedCountryValue].languages[0].name}, ${countryResponse[selectedCountryValue].languages[0].nativeName}`);
				$('#timezones').html(countryResponse[selectedCountryValue].timezones[0]);
				$('#country-calling-code').html(countryResponse[selectedCountryValue].callingCodes[0]);
				$('#flag-box').html(`<img src=${countryResponse[selectedCountryValue].flag}>`);
				$.ajax({
					url: `https://api.openweathermap.org/data/2.5/weather?q=${countryResponse[selectedCountryValue].capital}&units=metric&appid=<YOUR_APP_ID>`,
					type: 'GET',
					success: function (weatherResponse) {
						// console.log(weatherResponse);
						$('#weather-icon').html(`<img src=https://openweathermap.org/img/wn/${weatherResponse.weather[0].icon}@2x.png>`);
						$('#weather-description').html(`${weatherResponse.weather[0].description}`);
						$('#wind-speed').html(`${weatherResponse.wind.speed} km/h`);
						$('#temperature').html(`${weatherResponse.main.temp}&#8451;`);
						$('#humidity').html(`${weatherResponse.main.humidity}%`);
						$('#visibility').html(`${weatherResponse.visibility} m`);
					},
				});
				// console.log(countryResponse[selectedCountryValue].latlng[0]);
				// console.log(countryResponse[selectedCountryValue].latlng[1]);

				function initMap() {
					let map = new google.maps.Map(document.getElementById('map'), {
						center: { lat: countryResponse[selectedCountryValue].latlng[0], lng: countryResponse[selectedCountryValue].latlng[1] },
						zoom: 4,
					});
					let marker = new google.maps.Marker({
						position: { lat: countryResponse[selectedCountryValue].latlng[0], lng: countryResponse[selectedCountryValue].latlng[1] },
						map: map,
					});
				}
				initMap();
			});
		},
	});
});
