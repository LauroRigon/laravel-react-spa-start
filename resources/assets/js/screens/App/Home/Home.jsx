import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Home extends Component {
  render() {
    return (
      <div>
        <Link to='/auth/login'>Ir para o login</Link>
        Home screen
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch)
}

export default connect(null, )(Home);
