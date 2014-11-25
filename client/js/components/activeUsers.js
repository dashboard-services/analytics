'use strict';

var React = require( 'react' );

var ActiveUsers = React.createClass( {
	getInitialState: function(){
		return {activeUsers: 0};
	},
	componentDidMount: function(){
		var self = this;
		this.props.socket.on( 'update', function( data ){
			self.setState( {activeUsers: data.activeUsers} );
			self.forceUpdate();
		} );
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
