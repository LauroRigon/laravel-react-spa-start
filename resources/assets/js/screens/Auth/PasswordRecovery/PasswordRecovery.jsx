import React from 'react';
import PasswordReset from '../../../components/Auth/PasswordReset/PasswordReset';
import { Grid, Segment, Step, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import If from '../../../components/UI/If';
import PasswordForgot from '../../../components/Auth/PasswordForgot/PasswordForgot';
import { 
  moveForward, 
  moveBackward, 
  setEmail, 
  setLoading, 
  submitRecoveryRequest, 
  setToken, 
  setPassword, 
  setPasswordConfirm 
} from './actions';

class AuthPasswordRecovery extends React.Component {
  constructor(props) {
    super(props);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleRecoveryRequestSubmit = this.handleRecoveryRequestSubmit.bind(this);

    this.handleTokenChange = this.handleTokenChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordConfirmChange = this.handlePasswordConfirmChange.bind(this);
  }

  componentDidMount() {
    this.props.setEmail(this.props.emailOnLogin);
  }

  /*
  * Parte do pedido
  */
  handleRecoveryRequestSubmit() {
    this.props.submitRecoveryRequest({ email: this.props.forms.email });
  }

  handleEmailChange(value) {
    this.props.setEmail(value);
  }
  /**##### */

  /*
  * Parte de reset
  */
  handleTokenChange(value) {
    this.props.setToken(value);
  }

  handlePasswordChange(value) {
    this.props.setPassword(value);
  }

  handlePasswordConfirmChange(value) {
    this.props.setPasswordConfirm(value);
  }
  /*#######*/
  render() {
    const {
      steps,
      stepActivated,
      forms,

      moveForward,
      moveBackward,
    } = this.props;
    // implementar com o router essa parte
    // ver como sincronizar com o step by step
    return (
      <React.Fragment>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Step.Group attached='top' fluid size='small' stackable='tablet' items={steps} />
            <button onClick={moveBackward}>tras</button>
            <button onClick={moveForward}>frente</button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered columns={3}>
          <Grid.Column>
            <If test={stepActivated == 'request'}>
              <PasswordForgot
                handleEmailChange={this.handleEmailChange}
                emailValue={forms.email}
                onSubmit={this.handleRecoveryRequestSubmit}
                isLoading={forms.isLoading}
              />
            </If>
            <If test={stepActivated == 'reset'}>
              <PasswordReset 
                tokenValue={forms.reset.token}
                passwordValue={forms.reset.password}
                passwordConfirmValue={forms.reset.password_confirm}
                handleTokenChange={this.handleTokenChange}
                handlePasswordChange={this.handlePasswordChange}
                handlePasswordConfirmChange={this.handlePasswordConfirmChange}
                isLoading={forms.isLoading}
              />
            </If>
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    steps: state.auth.passwordRecovery.steps,
    stepActivated: state.auth.passwordRecovery.stepActivated,
    forms: state.auth.passwordRecovery.forms,
    emailOnLogin: state.auth.login.email,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    moveForward,
    moveBackward,
    setEmail,
    setLoading,
    submitRecoveryRequest,
    setToken,
    setPassword,
    setPasswordConfirm
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthPasswordRecovery));
