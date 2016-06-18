'use strict';

// Import the users components

module.exports = function (app, express, authsComponents, jwtObj, jwtConfig, mongooseOpt) {

  	var playersRouter = express.Router()

	function handleError(res, reason, message, code) {
	  console.log("ERROR: " + reason);
	  res.status(code || 500).json({"error": message});
	}
	/*  "/players"
	*    GET: finds all players
	*    POST: creates a new player
	*/
	playersRouter.get("/players", function(req, res) {
	 	User.find({}).toArray(function(err, players) {
	    if (err) {
	      handleError(res, err.message, "Failed to get players.");
	    } else {
	      res.status(200).json(players);
	    }
	});

	playersRouter.post("/players", function(req, res) {
		Player.findByTeamId(req.params.team_id, function(err, player){
		    if(err){
		    	player = Player.insert({req.params.player})
		    	res.status(201).json(player);
		    }
		    else{
		    	handleError(res, err.message, "Failed to create new player.");
		    }
		});
	});

	/*  "/players/:id"
	 *    GET: find player by id
	 *    PUT: update player by id
	 *    DELETE: deletes player by id
	 */

	playersRouter.get("/players/:id", function(req, res) {
	    Player.findById(req.params.id, function(err, player){
		    if(err) res.send(err);
		    res.json(player);
		});
	});

	playersRouter.put("/players/:id", function(req, res) {

	});

	playersRouter.delete("/players/:id", function(req, res) {	
		Player.deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
		    if (err) {
		      handleError(res, err.message, "Failed to delete player");
		    } else {
		      res.status(204).end();
		    }
	  	});
	});

  	app.use('/players', playersRouter)
}
