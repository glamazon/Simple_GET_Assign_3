'use strict';

function getDogImage(breed) {
	fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
		.then((response) => response.json())
		.then((responseJson) => displayResults(responseJson))
		.catch((error) => alert('Something went wrong. Try again later.'));
}

function displayResults(responseJson) {
	console.log(responseJson);

	if (responseJson.message === 'Breed not found (master breed does not exist)') {
		alert("That breed wasn't found, please try another.");
	} else {
		//replace the existing image with the new one
		$('.results').html(`<h2>Look at this dog!</h2>`);

		let splitUrl = responseJson.message.split('/');
		let breedName = splitUrl[4];
		$('.results').append(`<h3>${breedName}</h3>`);

		$('.results').append(`<img src="${responseJson.message}" class="results-img" width="200" height="auto">`);
		//display the results section
		$('.results').removeClass('hidden');
	}
}

function watchForm() {
	$('form').submit((event) => {
		event.preventDefault();
		let breedOfDog = $('input[name="breedOfDog"]').val();
		getDogImage(breedOfDog);
	});
}

$(function() {
	console.log('App loaded! Waiting for submit!');
	watchForm();
});
