'use strict';

//enter API key
const apiKey = 'IO1Ea7oJzXftheKbVt6cE38PxeGPiZexTYanq8Tx';
const searchURL = 'https://api.nps.gov/api/v1/parks';


function formatQueryParams(params) {
	const queryItems = Object.keys(params)
	.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
	return queryItems.join('&');
}


function displayResults(responseJson, maxResults) {
	//empty previous results
	//console.log(responseJson);
	$('#results-list').empty();

	for (let i = 0; i < responseJson.data.length && i < maxResults; i++){
		$('#results-list').append(
			`<li><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></h3>
			<p>${responseJson.data[i].description}</p>
			</li>`);

	}
	$('#results').removeClass('hidden');
}



function getParks(query, maxResults=10) {
	const params = {
		//add params here from documentation
		stateCode: query,
		limit: maxResults,
		api_key: apiKey
	};

	const queryString = formatQueryParams(params)
	//customize url below
	const url = searchURL + '?' + queryString;

	console.log(url);

	//fetch JSON data
	fetch(url)
		.then(response => {
			if (response.ok) {
				return response.json();
			}
			throw new Error(response.statusText);
		})
		.then(responseJson => displayResults(responseJson, maxResults))
		.catch(err => {
      console.log('gothere');
			$('#js-error-message').text(`Something went wrong: ${err.message}`);
		});
}




function watchForm() {
	$('form').submit(event => {
		event.preventDefault();
		const searchTerm = $('#js-search-term').val();
		const maxResults = $('#js-max-results').val();
    console.log(searchTerm);
    console.log(maxResults);
		getParks(searchTerm, maxResults);
	});
}

$(watchForm);