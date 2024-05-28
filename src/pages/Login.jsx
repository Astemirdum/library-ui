import React from 'react';
import { NavLink, Navigate } from 'react-router-dom'
import { useAuthCtx } from '../context/AuthContext'
import { Button, Form, Grid, Segment, Message } from 'semantic-ui-react'
import { parseJwt, handleLogError } from '../utils/helpers'
import GatewayService from '../API/GatewayService';

const Login = () => {
  const { user, setUser, isAuth, login } = useAuthCtx();

  const authorizeUser = (e) => {
    e.preventDefault()

    const { username, password } = user;
    GatewayService.authorizeUser({username, password})
      .then(response => {
        const accessToken = response.data.access_token;
        const data = parseJwt(accessToken);
        // console.log('data', data);
        login(username, data.profile.role.toUpperCase(), accessToken);
      })
      .catch(error => {
        handleLogError(error)
        setUser({ ...user, isError: true})
      })
  }

  if (isAuth) {
    return <Navigate to={'/'} />
  } else {
    return (
      <Grid textAlign='center'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Form size='large' onSubmit={authorizeUser}>
            <Segment>
              <Form.Input
                fluid
                autoFocus
                name='username'
                icon='user'
                iconPosition='left'
                placeholder='Username'
                value={user.username}
                onChange={e => setUser({...user, username: e.target.value})}
              />
              <Form.Input
                fluid
                name='password'
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                value={user.password}
                onChange={e => setUser({...user, password: e.target.value})}
              />
              <Button color='violet' fluid size='large'>Login</Button>
            </Segment>
          </Form>
          <Message>{`Don't have already an account? `}
            <a href='/signup' color='violet' as={NavLink} to="/signup">Sign Up</a>
          </Message>
          {user.isError && <Message negative>The username or password provided are incorrect!</Message>}
        </Grid.Column>
      </Grid>
    )
  }
}

export default Login;
