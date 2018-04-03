require("dotenv").config();


// Gets the twitter and spotify info from the keys.js file 
var keys = require("./keys.js");


var Spotify = require('node-spotify-api');

var Twitter = require('twitter');



//this will access the keys' information
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);




//this makes liri do the movie info
if (process.argv[2] === "movie-this") {



	// Include the request npm package 
	var request = require("request");


	//user's in put will be node liri.js "movie title"
	var title = process.argv[3];


	title = title.replace(' ', '+');

	// Then run a request to the OMDB API with the movie specified
	request("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

		// If the request is successful (i.e. if the response status code is 200)
		if (!error && response.statusCode === 200) {

			// Parse the body of the site and recover just the imdbRating
			// (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
			console.log("Title: " + JSON.parse(body).Title);
			console.log("Release Date: " + JSON.parse(body).Released);
			console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
			console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
			console.log("Country: " + JSON.parse(body).Country);
			console.log("Language: " + JSON.parse(body).Language);
			console.log("Plot: " + JSON.parse(body).Plot);
			console.log("Actors: " + JSON.parse(body).Actors);

		}
	});

}

else if (process.argv[2] === "my-tweets") {


	var params = { screen_name: 'rkrug1123' };
	client.get('statuses/user_timeline', params, function (error, tweets, response) {
		if (!error) {
			console.log(tweets);
		}
	});


















}

else if (process.argv[2] === "spotify-this-song") {

	var song = process.argv[3];




	spotify.search({ type: 'track', query: song }, function (err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}

		// console.log((JSON.stringify(data)));
		console.log(data.tracks.href);
		console.log(data.tracks.items[0].name);
		console.log(data.tracks.items[0].artists[0].name);


	});



}