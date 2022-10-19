import { useContext } from 'react'
import { AuthContext } from '../context/auth'

const Home = () => {
	const [auth, setAuth] = useContext(AuthContext)
	return (
		<>
			<h1>{JSON.stringify(auth)}</h1>
		</>
	)
}
export default Home
