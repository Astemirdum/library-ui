import React from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import { Button, Form, Grid, Segment, Message } from 'semantic-ui-react'
import {useAuthCtx} from '../context/AuthContext'
import { handleLogError } from '../utils/helpers'
import GatewayService from '../API/GatewayService'


const  Signup = () => {
  const { user, setUser, isAuth } = useAuthCtx();
  console.log('Signup isAuth', isAuth);
  console.log('Signup user', user);

  const registerUser = (e) => {
    e.preventDefault()

    const { username, password, email } = user
    
    if (!(username && password && email)) {
      setUser({ ...user, isError: true, errorMessage: 'Please, inform all fields!'})
      return
    }

    GatewayService.registerUser(user)
      .then(response => {
        
      })
      .catch(error => {
        handleLogError(error)
        if (error.response && error.response.data) {
          const errorData = error.response.data
          let errorMessage = 'Invalid fields'
          if (errorData.status === 400) {
            errorMessage = errorData.errors[0].defaultMessage
          }
          setUser({...user, isError: true, errorMessage: errorMessage})
        }
      })
  }
  

  if (isAuth) {
    return <Navigate to='/' />
  } else {
    return (
      <Grid textAlign='center'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Form size='large' onSubmit={registerUser}>
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
              <Form.Input
                fluid
                name='email'
                icon='at'
                iconPosition='left'
                placeholder='Email'
                value={user.email}
                onChange={e => setUser({...user, email: e.target.value})}
              />
              <Button color='violet' fluid size='large'>Signup</Button>
            </Segment>
          </Form>
          <Message>{`Already have an account? `}
            <a href='/login' color='violet' as={NavLink} to="/login">Login</a>
          </Message>
          {user.isError && <Message negative>{user.errorMessage}</Message>}
        </Grid.Column>
      </Grid>
    )
  }
}


export default Signup