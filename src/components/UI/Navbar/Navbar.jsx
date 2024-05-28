import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Menu } from 'semantic-ui-react'
import { useAuthCtx } from '../../../context/AuthContext'
import Loader from '../Loader/Loader'

function Navbar() {
  const { user, isAuth, logout, isLoading } = useAuthCtx();

  if (isLoading) {
    return <Loader/>
  }

  
  const enterMenuStyle = () => {
    return isAuth ? { "display": "none" } : { "display": "block" }
  }

  const logoutMenuStyle = () => {
    return isAuth ? { "display": "block" } : { "display": "none" }
  }

  const userPageStyle = () => {
    return user && user.role === 'USER' ? { "display": "block" } : { "display": "none" }
  }

  const adminPageStyle = () => {
    return user && user.role === 'ADMIN' ? { "display": "block" } : { "display": "none" }
  }


  return (
    <Menu inverted color='violet' stackable size='massive' style={{borderRadius: 0}}>
      <Container>
        <Menu.Item header>Library-UI</Menu.Item>
        <Menu.Item as={Link} exact='true' to="/">Home</Menu.Item>
        <Menu.Item as={Link} to="/libraries" style={userPageStyle()}>LibrariesPage</Menu.Item>
        <Menu.Item as={Link} to="/reservations" style={userPageStyle()}>ReservationPage</Menu.Item>
        <Menu.Item as={Link} to="/rating" style={userPageStyle()}>RatingPage</Menu.Item>
        <Menu.Item as={Link} to="/stats" style={adminPageStyle()}>StatsPage</Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item as={Link} to="/login" style={enterMenuStyle()}>Login</Menu.Item>
          <Menu.Item as={Link} to="/signup" style={enterMenuStyle()}>Sign Up</Menu.Item>
          <Menu.Item header style={logoutMenuStyle()}>{`Hi ${user.username}`}</Menu.Item>
          <Menu.Item as={Link} to="/" style={logoutMenuStyle()} onClick={logout}>Logout</Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  )
}

export default Navbar
