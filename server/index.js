var express = require( 'express' ),
		router = express.Router(),
		app = express(),
		server = require('http').Server(app),
		io = require('socket.io')(server),
		path = require( 'path' ),
		nconf = require( 'nconf' ).argv().env().file( path.join( __dirname, 'config', 'settings.json' ) ),
		debug = require( 'debug' )( 'Analytics:app' ),
		RTAnalytics = require( './libs/analytics' );

var PORT = nconf.get( 'PORT' ) || 3000;

router.get( '/api/activeUsers', function( req, res, next ){
		RTAnalytics.oauth2Client.setCredentials( require('./config/settings').tokens );
		RTAnalytics.analytics.data.realtime.get( { auth: RTAnalytics.oauth2Client, ids: 'ga:'+nconf.get('profile'), metrics: 'rt:activeUsers' }, function(err, profile, req){
			res.json( {error: err, profile:profile} );
		} );
} );

io.on('connection', function (socket) {
	setInterval( function(){
		RTAnalytics.oauth2Client.setCredentials( nconf.get('tokens') );
		RTAnalytics.analytics.data.realtime.get( { auth: RTAnalytics.oauth2Client, ids: 'ga:'+nconf.get('profile'), metrics: 'rt:activeUsers' }, function(err, profile, req){
			var activeUsers = 0;
			if( !err )
			{
				activeUsers = profile.totalsForAllResults['rt:activeUsers'];
			}
			socket.emit( 'update', {activeUsers:activeUsers} );
		} );
	}, 1000 );
});

app.use( '/', router );

if( !module.parent ){
	server.listen( PORT, function(){
		debug( 'API up and running in port %d', PORT );
	} );
}

module.exports = app;
