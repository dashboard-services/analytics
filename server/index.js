var express = require( 'express' ),
		router = express.Router(),
		app = express(),
		server = require('http').Server(app),
		io = require('socket.io')(server),
		path = require( 'path' ),
		nconf = require( 'nconf' ).argv().env().file( path.join( __dirname, 'config', 'settings.json' ) ),
		debug = require( 'debug' )( 'Analytics:app' ),
		fs = require( 'fs' ),
		RTAnalytics = require( './libs/analytics' );

var PORT = nconf.get( 'PORT' ) || 3000;

router.use('/', express.static(__dirname + '/../client'));

router.get( '/', function( req, res, next ){
	res.set('Content-Type', 'text/html');
	fs.createReadStream( path.join( __dirname, '..', 'client', 'index.html' ) ).pipe( res );
} );

router.get( '/api/activeUsers', function( req, res, next ){
		RTAnalytics.oauth2Client.setCredentials( require('./config/settings').tokens );
		RTAnalytics.analytics.data.realtime.get( { auth: RTAnalytics.oauth2Client, ids: 'ga:'+nconf.get('profile'), metrics: 'rt:activeUsers' }, function(err, profile, req){
			var activeUsers = 0;
			if( !err )
			{
				activeUsers = profile.totalsForAllResults['rt:activeUsers'];
			}
			res.json( {activeUsers:activeUsers} );
		} );
} );

app.use( '/', router );

if( !module.parent ){
	server.listen( PORT, function(){
		debug( 'API up and running in port %d', PORT );
	} );
}

module.exports = app;
