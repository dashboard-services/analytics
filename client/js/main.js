'use strict';

var React = require( 'react' ),
    debug = require('debug'),
    ActiveUsers = require( './components/activeUsers' );

debug.enable( 'GoogleAnalytics:*' );

React.render( <ActiveUsers socket={io.connect(window.location.href)}/>, document.getElementById( 'active-users-container' ) );
