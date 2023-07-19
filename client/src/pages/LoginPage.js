import { useState } from 'react'
import { Navigate } from 'react-router-dom'

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)

  async function login(e) {
    e.preventDefault()
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // send req with credentials (cookies)
    })
    if(response.status === 200) {
      // alert('login successful')
      setRedirect(true)
    } else {
      alert('login failed')
    }
  }

  if (redirect) {
    return <Navigate to="/" />
  }

  return (
    <form onSubmit={login} className="login">
      <h1>Login</h1>
      <input 
        type="text"
        placeholder="username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input 
        type="password"
        placeholder="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button>Login</button>
    </form>
  )
}

export default LoginPage
