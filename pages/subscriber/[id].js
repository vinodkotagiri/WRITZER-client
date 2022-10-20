import SubscriberLayout from '../../components/layouts/component.subscriberlayout'
import { useState, useEffect, useContext } from 'react'
import { Row, Col, Button, Input, Checkbox, Select, Avatar } from 'antd'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { AuthContext } from '../../context/auth'
import { MediaContext } from '../../context/media'
import Media from '../../components/mediauploader'

const UpdateUser = () => {
	// context
	const [auth, setAuth] = useContext(AuthContext)
	const [media, setMedia] = useContext(MediaContext)
	// state
	const [id, setId] = useState('')
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [website, setWebsite] = useState('')
	const [password, setPassword] = useState()
	const [role, setRole] = useState('')
	const [image, setImage] = useState({})
	const [loading, setLoading] = useState(false)
	// hooks
	const router = useRouter()

	useEffect(() => {
		const currentUser = async () => {
			try {
				const { data } = await axios.get(`/user/${router?.query?.id}`)
				console.log('current_user', data)
				setId(data.rest._id)
				setName(data.rest.name)
				setEmail(data.rest.email)
				setWebsite(data.rest.website)
				setRole(data.rest.role)
				setImage(data.rest.image)
			} catch (err) {}
		}
		if (auth?.token) currentUser()
	}, [auth, router?.query?.id])
	console.log(email)
	// function
	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const { data } = await axios.put(
				`/user/update-by-${(auth?.user?.role).toLowerCase()}`,
				{
					id,
					name,
					email,
					password,
					website,
					role,
					image: media?.selected?._id
						? media?.selected?._id
						: image?._id
						? image?._id
						: undefined,
				}
			)
			// console.log('update_user', data)
			if (data?.error) {
				toast.error(data.error)
			} else {
				// udpate context and local storage for current user only
				if (auth?.user?._id === data._id) {
					setAuth({ ...auth, user: data })
					let fromLocalStorage = JSON.parse(localStorage.getItem('auth'))
					fromLocalStorage.user = data
					localStorage.setItem('auth', JSON.stringify(fromLocalStorage))
				}

				toast.success('User updated successfully')
			}
		} catch (err) {
			console.log(err)
			toast.error('User update failed. Try again.')
			setLoading(false)
		}
	}

	// show form
	return (
		<SubscriberLayout>
			<Row>
				<Col span={12} offset={6}>
					<h4 style={{ marginBottom: '-10px' }}>Profile update</h4>

					<div style={{ marginBottom: 20, textAlign: 'center' }}>
						{media.selected ? (
							<>
								<div style={{ marginBottom: 15 }}></div>
								<Avatar src={media.selected.url} size={100} />
							</>
						) : image ? (
							<>
								<div style={{ marginBottom: 15 }}></div>
								<Avatar src={image.url} size={100} />
							</>
						) : (
							''
						)}
					</div>

					{auth?.user?.role !== 'Subscriber' && <Media />}

					<Input
						style={{ margin: '20px 0px 10px 0px' }}
						size='large'
						placeholder='Full name'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<Input
						style={{ margin: '10px 0px 10px 0px' }}
						size='large'
						placeholder='Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						style={{ margin: '10px 0px 10px 0px' }}
						size='large'
						placeholder='Website'
						value={website}
						onChange={(e) => setWebsite(e.target.value)}
					/>

					<Input.Password
						style={{ margin: '10px 0px 10px 0px' }}
						size='large'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					{auth?.user?.role === 'Admin' && (
						<Select
							value={role}
							style={{ margin: '10px 0px 10px 0px', width: '100%' }}
							onChange={(e) => setRole(e)}>
							<Select.Option value='Subscriber'>Subscriber</Select.Option>
							<Select.Option value='Author'>Author</Select.Option>
							<Select.Option value='Admin'>Admin</Select.Option>
						</Select>
					)}

					<Button
						onClick={handleSubmit}
						type='default'
						style={{ margin: '10px 0px 10px 0px' }}
						loading={loading}
						block>
						Submit
					</Button>
				</Col>
			</Row>
		</SubscriberLayout>
	)
}

export default UpdateUser
