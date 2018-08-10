import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

class OnlyGuestRoute extends Component {
  render() {
    const redirectTo = this.props.location.state || { from: "/" };
    
    return (
      (this.props.isLogged == false)
        ? this.props.children
        : <Redirect to={redirectTo.from} />
    );
  }
}

const mapStateToProps = state => {
  return {
    isLogged: state.user.isLogged
  }
}

export default withRouter(connect(mapStateToProps)(OnlyGuestRoute));