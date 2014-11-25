var google = require('googleapis'),
		OAuth2Client = google.auth.OAuth2,
		path = require( 'path' ),
		nconf = require( 'nconf' ).argv().env().file( path.join( __dirname, '..', 'config', 'settings.json' ) ),
		analytics = google.analytics( 'v3' ),
		oauth2Client;

module.exports.oauth2Client = new OAuth2Client( nconf.get( 'client_id' ), nconf.get( 'client_secret' ), nconf.get( 'redirect_url' ) );
module.exports.analytics = analytics;

