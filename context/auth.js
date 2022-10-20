import { useState, useEffect, createContext } from 'react'
import axois from 'axios'
import axios from 'axios'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({
		user: null,
		token: '',
	})

	// config axios
	if (process.server) {
		axios.defaults.baseURL = 'https://writzer-server.onrender.com'
		axios.defaults.headers.common['Authorization'] = `Bearer ${auth?.token}`
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
	} else {
		axios.defaults.baseURL = 'https://writzer-server.onrender.com'
		axios.defaults.headers.common['Authorization'] = `Bearer ${auth?.token}`
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
	}

	useEffect(() => {
		if (localStorage.getItem('auth')) {
			setAuth(JSON.parse(localStorage.getItem('auth')))
		}
	}, [])

	return (
		<AuthContext.Provider value={[auth, setAuth]}>
			{children}
		</AuthContext.Provider>
	)
}

export { AuthContext, AuthProvider }
