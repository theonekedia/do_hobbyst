'use strict';

// Import the users components

module.exports = function (app, express, authsComponents, jwtObj, jwtConfig, mongooseOpt) {

  	var eventsRouter = express.Router()

	function handleError(res, reason, message, code) {
	  console.log("ERROR: " + reason);
	  res.status(code || 500).json({"error": message});
	}
	/*  "/events"
	*    GET: finds all events
	*    POST: creates a new events
	*/
	eventsRouter.get('/live', function(req, res) {
	 	Event.find({endTime: {$gt: new Date()} }).toArray(function(err, event) {
	    var result = {};
	    if (err) {
	      handleError(res, err.message, "Failed to get any event.");
	    } else {
	    	result['event'] = event;
	    	Team.findByName(event.teamA).toArray(function(err, teamA) {
	    		if (err) {
	      			handleError(res, err.message, "Failed to get any event.");
	    		} 
	    		else {
	    			result['event']['teamA'] = teamA
	    			Player.findByTeamId(teamA._id).toArray(function(err, players) {
			    		if (err) {
			      			handleError(res, err.message, "Failed to get any event.");
			    		} 
			    		else {
			    			result['event']['teamA']['players'] = players
			    		}
			    	}
	    		}
	    	}
	    	Team.findByName(event.teamb).toArray(function(err, teamB) {
	    		if (err) {
	      			handleError(res, err.message, "Failed to get any event.");
	    		} 
	    		else {
	    			result['event']['teamb'] = teamB
	    			Player.findByTeamId(teamB._id).toArray(function(err, players) {
			    		if (err) {
			      			handleError(res, err.message, "Failed to get any event.");
			    		} 
			    		else {
			    			result['event']['teamA']['players'] = players
			    		}
			    	}
	    		}
	    	}
	      res.status(200).json(result);
	    }
	})

  	app.use('/events', eventsRouter)
}
