import { useContext, useEffect, useState } from 'react'
import { Layout } from 'antd'
import AdminSider from '../../components/siders/component.adminsider'
import { AuthContext } from '../../context/auth'
import { useRouter } from 'next/router'
import axios from 'axios'
import LoadingToRedirect from '../redirect/component.redirect'

const { Content } = Layout

function AdminLayout({ children }) {
	// context
	const [auth, setAuth] = useContext(AuthContext)
	// state
	const [loading, setLoading] = useState(true)
	// hooks
	const router = useRouter()

	useEffect(() => {
		// if (auth?.user?.role !== "Admin") {
		//   router.push("/");
		// } else {
		//   setLoading(false);
		// }
		if (auth?.token) getCurrentAdmin()
	}, [auth?.token])

	const getCurrentAdmin = async () => {
		try {
			const { data } = await axios.get(`/user/${auth.user._id}`)
			setLoading(false)
		} catch (err) {
			console.log(err)
			router.push('/')
		}
	}

	if (loading) {
		return <LoadingToRedirect />
	}

	return (
		<Layout>
			<AdminSider />
			<Layout>
				<Content style={{ padding: '10px' }}>{children}</Content>
			</Layout>
		</Layout>
	)
}

export default AdminLayout
