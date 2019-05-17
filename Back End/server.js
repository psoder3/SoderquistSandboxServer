// set up server
var config = require('./config/config.js'), // import config variables
  port = config.port,                       // set the port
  express = require('express'),             // use express as the framwork
  app = express(),                          // create the server using express
  path = require('path');                   // utility module

var bodyParser = require("body-parser");
var numPageHits = 0;
var MasterPaperlist = [];
var PaperListofchange = [];
var MozzListofchange = [];
var globalid = 0;
var Timestamp = Date.now();
var Listofcheese = [];

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
app.get('/mossGame', function(req,res){
	res.sendFile(path.resolve(__dirname + '/../Front End/Mozzarella.html'));
});
app.get('/dvd', function(req,res){
	res.sendFile(path.resolve(__dirname + '/../Front End/DVDmove.html'));
});

app.get('/Uno_Card_Script.js', function(req,res){
	res.sendFile(path.resolve(__dirname + '/../Front End/Uno_Card_Script.js'));
});

app.get('/mozzimage/:filename', function(req,res) {
	var filename = req.params.filename;
	res.sendFile(path.resolve(__dirname + '/../Front End/Images/'+filename));
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
app.get('/Potition/gridrecive/:Gridlist', function(req,res) {
	var parsedGridlist = req.params.Gridlist;
	
	
	if(MasterPaperlist.length == 0){


			
				    for (var i = 0; i < 200; i++) {
					var rowlist = [];
					for (var j = 0; j < 200; j++) {
					    var pixel = new createpixelclass(j, i);
					    rowlist.push(pixel);
					}
					MasterPaperlist.push(rowlist);
					
				    }

		
	}
	
	if(parsedGridlist == 2){
	
		MasterPaperlist = []; // I changed this from (it used to start with var) - Soderquist
                Listofchange = []; // I changed this from (it used to start with var) - Soderquist
	   
	   
	   }			
	if(parsedGridlist == 3){
		console.log("option 3");
		console.log(Listofchange);
		//console.log(MasterPaperlist);
	   		res.send({
			//'MasterPaperlist':[{val:'I'},{val:'hope'},{val:'this'},{val:'works'}]
			'MasterPaperlist':MasterPaperlist
		
		});
	   
	   }


	var ListofColor = [];
	
	if(parsedGridlist == 5){
		console.log(PaperListofchange);
		res.send({
			'Listofchange':PaperListofchange
		});
		
	}


});
function createpixelclass(j, i) {

this.X = j;
this.Y = i;
this.div;
this.color = 'white';
this.player;
this.motion;

   
}
//app.use(myParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.post('/Potition/gridsend', function(req,res) {
	console.log(req.body);
	var data = req.body;
	var inlist = false;
	
	for(var i = 0; i < PaperListofchange.length; i++){
		  if(Date.now-data.TimeStamp > 10){
		   	PaperListofchange.splice(i,1);
			  inlist = true;
		for(var i = 0; i < 200; i++){
			for(var j = 0; j < 200; j++){
				if(MasterPaperlist[i][j].color == Mycolor){
					MasterPaperlist[i][j].color = 'white';
					MasterPaperlist[i][j].motion = false;
					MasterPaperlist[i][j].player = false;

				}
			}
			}
		   }else if(PaperListofchange[i].Isdead){
		   PaperListofchange.splice(i,1);
			inlist = true;
		   }else if(PaperListofchange[i].color == data.color){
		   PaperListofchange[i] = data;
			inlist = true;
		   }
	}

	if(!inlist){
	   	Listofchange.push(data);
	   }

	res.send({"result":"hi"});
	
	   
});

//Mossta
app.get('/mozz/gridrecive/:Gridlist', function(req,res) {
	
	var parsedGridlist = req.params.Gridlist;
	
	if(parsedGridlist == 3){
		MozzListofchange = [];
		globalid = 0;
		GlobalCheeseID = 0;
	}
	if(parsedGridlist == 5){

	res.send({
			
			'Listofchange':MozzListofchange,
			'Cheeselist':Listofcheese
	});
	}

});
app.post('/mozz/gridsend', function(req,res) {

	var data = req.body;
	var inlist = false;
	var cheeseImglist = ["http://10.65.1.197:8000/mozzimage/CheeseMoving.gif","http://10.65.1.197:8000/mozzimage/CheeseCurd.gif"];
        if(data.Timestamp - Timestamp > 30000){
          MozzListofchange = [];
          globalid = 0;

        }
	for(var i = 0; Listofcheese.length < 100; i++){
		var RandomX = Math.floor((Math.random() * 2000)) - 1000
		var RandomY = Math.floor((Math.random() * 2000)) - 1000
		var randomcheese = Math.floor((Math.random() * cheeseImglist.length));
	   	var cheeseobj = {
			'Id':globalid,
			'X':RandomX,
			'Y':RandomY,
			'gif':cheeseImglist[randomcheese]
		};
		globalid++;
		Listofcheese.push(cheeseobj);
	}
	   
	Timestamp = Date.now();
	for(var i = 0; i < MozzListofchange.length; i++){
                 Timestamp = Date.now();
		 if(MozzListofchange[i].Id == data.Id){
		   	MozzListofchange[i] = data;
			inlist = true;
		   }
		 if(Timestamp - MozzListofchange[i].TimeStamp > 2000){
			console.log("Found time");
		 	MozzListofchange.splice(i,1);
			
		  }else	if(MozzListofchange[i].Isdead){
		  	MozzListofchange.splice(i,1);
			inlist = true;
		   }

	}

	if(!inlist){
		data.Id = globalid;
		globalid++;
	   	MozzListofchange.push(data);
	   }
	
	res.send({"result":"hi"});
});

//Mossta
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
