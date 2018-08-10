import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Header, Form, Segment, Button, Message, Grid } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { setEmail, setPassword, setRemember, clearInputs, submitLogin } from './actions';

class AuthLogin extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.clearInputs()
  }

  render() {
    const {
      email,
      password,
      remember,
      errors,
      isLoading,

      setEmail,
      setPassword,
      setRemember,
      submitLogin
    } = this.props;



    return (
      <div style={{ maxWidth: '450px' }}>
        <Grid.Row>
          <Header as='h2' color='teal' textAlign='center'>
            Entrar em sua conta.
        </Header>
          <Form size='large'
            loading={isLoading}
            error={(errors.length) ? true : false}
            onSubmit={() => submitLogin()}
          >
            <Segment>
              <Form.Input icon='user' iconPosition='left' placeholder='Digite seu e-mail' type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <Form.Input icon='lock' iconPosition='left' placeholder='Digite sua senha' type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <Form.Group widths='equal'>
                <Form.Checkbox label='Lembrar-me' slider
                  checked={remember}
                  onChange={e => setRemember()}
                />
                <Link to='/auth/password/recovery'>Esqueci minha senha</Link>
              </Form.Group>

              <Button color='teal' size='large' fluid>
                Entrar
            </Button>

              <Message error>
                <Message.Header >
                  Não foi possível completar o cadastro!
              </Message.Header>
                <ul>
                  {errors.map(error => (<li key={error}>{error}</li>))}
                </ul>
              </Message>
            </Segment>
            <Segment textAlign='center'>
              Ainda não é cadastrado? <Link to='/auth/register'>Inscreva-se</Link>
            </Segment>
          </Form>
        </Grid.Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    email: state.auth.login.email,
    password: state.auth.login.password,
    remember: state.auth.login.remember,
    errors: state.auth.login.errors,
    isLoading: state.auth.login.isLoading,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setEmail,
    setPassword,
    setRemember,
    clearInputs,
    submitLogin,
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthLogin));