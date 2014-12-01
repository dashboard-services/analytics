'use strict';

var React = require( 'react' ),
    debug = require('debug'),
    ActiveUsers = require( './components/activeUsers' );

debug.enable( 'GoogleAnalytics:*' );

React.render( <ActiveUsers />, document.getElementById( 'active-users-container' ) );
