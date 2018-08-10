import React from 'react'
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { doLogout } from './actions';

class AuthLogOutBtn extends React.Component {
  render() {
    return (
      <Button color="red" onClick={this.props.doLogout}>Sair</Button>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ doLogout }, dispatch)
}

export default connect(null, mapDispatchToProps)(AuthLogOutBtn);
