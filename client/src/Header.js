import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
  const {userInfo, setUserInfo} = useContext(UserContext);

  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(userInfo => {
      setUserInfo(userInfo)
    })
    .catch(error => console.error('There has been a problem with your fetch operation:', error));
  }, [])
  

  function logout () {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST'
    })
    setUserInfo(null)
  }

  const username = userInfo?.username;

  return (
    <header>
    <Link to='/' className='logo'>MyBlog</Link>

    <nav>
      {username && (
        <>
          <Link to='/create'>Create Post</Link>
          <a onClick={logout}>Logout</a>
        </>
      )}
      {!username && (
        <>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
        </>  
      )}

    </nav>
  </header>
  )
}
