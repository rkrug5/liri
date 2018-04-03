require("dotenv").config();

// Gets the twitter and spotify info from the keys.js file 
var keys = require("./keys.js");


var Spotify = require('node-spotify-api');

var Twitter = require('twitter');

// Load the fs package to read and write
var fs = require("fs");


//this will access the keys' information
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


//this rest of this code should probably have been written with a switch statement similar to the bank.js example in class.  
//i will try to implement this at a later time.  

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
			console.log(tweets[7].text);
			console.log(tweets[6].text);
			console.log(tweets[5].text);
			console.log(tweets[4].text);
			console.log(tweets[3].text);
			console.log(tweets[2].text);
			console.log(tweets[1].text);
			console.log(tweets[0].text);
			console.log(tweets[0].created_at);


			//i know this code doesn't exactly do what the hw is asking for (and is quite inelegant), but i am not much of a twitter user.  this is just
			//to show proof of concept.  it would be better to stick it in a for loop to get the 20 tweets with time stamps and perhaps add some styling. like so:

			// for (var i = 0; i < 20; i++) {
			// 	console.log(" ");
			// 	console.log(tweets[i].text);
			// 	console.log(tweets[i].created_at);
			// 	console.log("______________________________________________________________________________________________________________");
			// }

			//even this will throw an error because i haven't made 20 tweets yet ._.
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
		//https://stackoverflow.com/questions/47657135/how-to-extract-data-from-spotify-npm-package-i-keep-getting-undefine


		console.log(" ");
		console.log(data.tracks.items[0].artists[0].name);
		console.log(data.tracks.items[0].name);
		console.log(data.tracks.items[0].album.external_urls.spotify);
		console.log(data.tracks.items[0].album.name);



	});


}

else if (process.argv[2] === "do-what-it-says") {

	// We will read the existing random.txt file
	fs.readFile("random.txt", "utf8", function (err, data) {
		if (err) {
			return console.log(err);
		}

		else {

			// Break down the command inside
			data = data.split(",");

			var command = data[0];
			var input = data[1];

			//console log to see if this is working
			console.log(command);
			console.log(input);

			//not doing a switch statement has brought me to this issue...
			//going to try this
			//https://stackoverflow.com/questions/5775088/how-to-execute-an-external-program-from-within-node-js

			var exec = require('child_process').exec;
			exec('node  liri.js  ' + command + ' ' + input, function callback(error, stdout, stderr) {

				// });

				// var exec = require('child_process').exec;
				// exec('pwd', function callback(error, stdout, stderr) {
				// result




				//exec('"/path/to/test file/test.sh" arg1 arg2');
				//Double quotes are used so that the space in the path is not interpreted as
				//multiple arguments

				// exec('"~/Desktop/coding/liri-node-app node liri.js" command input');




				// }

			});






		}








	})
}