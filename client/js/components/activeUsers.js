'use strict';

var React = require( 'react' );

var update = function( component ){
	return function(){
		$.get( 'api/activeUsers' ).done( function( data ){
			component.setState( {activeUsers: data.activeUsers} );
			component.forceUpdate();
		} );
	};
};

var ActiveUsers = React.createClass( {
	getInitialState: function(){
		return {activeUsers: 0};
	},
	componentDidMount: function(){
		setInterval( update( this ), /* each 3 secs */ 1000 * 3 );
	},
  render: function(){
    var self = this;
    return (
			<div
				className="col-md-3"
				dangerouslySetInnerHTML= {{
            __html: this.state.activeUsers
          }} />
    )
  }
} );

module.exports = ActiveUsers;
