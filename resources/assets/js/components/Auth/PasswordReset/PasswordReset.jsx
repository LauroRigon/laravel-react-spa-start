import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Header, Segment, Button } from 'semantic-ui-react';

class PasswordReset extends Component {
  render() {
    const {
      tokenValue,
      passwordValue,
      passwordConfirmValue,

      handlePasswordChange,
      handlePasswordConfirmChange,
      handleTokenChange
    } = this.props;

    return (
      <div style={{ maxWidth: '450px' }}>
        <Segment>
        <Header as='h4' textAlign='left'>
          Informe seu código recebido em seu e-mail
        </Header>
          <Form size='small'>
            <Form.Field width={4}>
              <Form.Input label='Código:' placeholder='Código' type='text'
                value={tokenValue}
                onChange={e => handleTokenChange(e.target.value)}
              />
            </Form.Field>

            <Form.Field>
              <Form.Input label='Nova senha:' placeholder='Digite sua nova senha' type='password'
                value={passwordValue}
                onChange={e => handlePasswordChange(e.target.value)}
              />
            </Form.Field>

            <Form.Field>
              <Form.Input label='Confirme sua nova senha:' placeholder='Digite sua nova senha novamente' type='password'
                value={passwordConfirmValue}
                onChange={e => handlePasswordConfirmChange(e.target.value)}
              />
            </Form.Field>
            <Button color='teal'>Continuar</Button>
          </Form>
        </Segment>
      </div>
    )
  }
}

PasswordReset.propTypes = {
  tokenValue: PropTypes.string.isRequired,
  passwordValue: PropTypes.string.isRequired,
  passwordConfirmValue: PropTypes.string.isRequired,
  handleTokenChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handlePasswordConfirmChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
}

export default PasswordReset;