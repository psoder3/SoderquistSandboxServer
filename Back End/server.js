// set up server
var config = require('./config/config.js'), // import config variables
  port = config.port,                       // set the port
  express = require('express'),             // use express as the framwork
  app = express(),                          // create the server using express
  path = require('path');                   // utility module


var numPageHits = 0;

app.use(express.static(path.join(__dirname, 'public'))); // this middleware serves static files, such as .js, .img, .css files

// Initialize server
var server = app.listen(port, function () {
  console.log('Listening on port %d', server.address().port);
});

// Use '/' to go to index.html via static middleware

// Use '/test' to send "test" as a response.
app.get('/test', function (req, res) {
  res.send('tested');
});

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});


app.post('/SaveComputerInfo', function(req,res){
	var params = req.params;
	//var input = JSON.parse(JSON.stringify(req.body));
	console.log("url params: ");
	console.log(params);
	console.log("input body: ");
	console.log(req.body);
	
	res.send({
		result: 'success',
		err: ''
	});

	res.send('{ result: "error", err: "couldn\'t find an item by that barcode"}');
	
});


// Add an endpoint to save a data structure as JSON to a file

app.get('/unoAIHadden', function(req,res){
	res.sendFile(path.resolve(__dirname + '/../Front End/Uno_Card_Game_AI_With_Updates.html'));
});
app.get('/scumAIHunter', function(req,res){
	res.sendFile(path.resolve(__dirname + '/../Front End/scumAIHunter.html'));
});
app.get('/dvd', function(req,res){
	res.sendFile(path.resolve(__dirname + '/../Front End/DVDmove.html'));
});

app.get('/Uno_Card_Script.js', function(req,res){
	res.sendFile(path.resolve(__dirname + '/../Front End/Uno_Card_Script.js'));
});


app.get('/oddOrEven/:number', function(req,res) {
	if (req.params.number % 2 == 0)
	{
		res.send({
			result: 'even'
		});
	}
	else
	{
		res.send({
			result: 'odd'
		});
	}	
});

function incrementHitCountOnFile()
{
	var hits;
	var fs = require('fs');
	fs. readFile('DataBase/hitcounter.txt', 'utf8', function(err, contents) {
		if (err)
		{
			return console.log(err);
		}
			
		console.log(contents);		

		hits = Number(contents);
		console.log(hits);
		hits += 1;
		
		console.log("hits");
		console.log('after calling readFile');
		
		fs.writeFile('DataBase/hitcounter.txt', hits, function(err) {
			if(err) {
				return console.log(err);
			}
			console.log("The file was saved!");
			var actualPageHits = hits;	
			console.log("Number of times the page has been visited (persistent over restarts)");
			console.log(actualPageHits);
		}); 
	
	
		
		
	});
	
	
}

app.get('/', function(req,res){
	numPageHits += 1;
	console.log(new Date());
	console.log("Number of times the page has been visited since server was last restarted");
	console.log(numPageHits);
	incrementHitCountOnFile();
	
res.sendFile(path.resolve(__dirname + '/../Front End/StudentProjectLandingPage.html'));
});

app.get('/checkHaddensPassword/:entry', function(req,res)
{
	var guess = req.params.entry;
	if (guess == "nd888nd7")
	{
		res.send({
			result: 'success',
			err: '',
			correct: true
		});
	}
	else
	{
		res.send({
			result: 'success',
			err: '',
			correct: false
		});
	}
});
