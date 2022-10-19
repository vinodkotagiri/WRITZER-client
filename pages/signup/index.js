import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input } from 'antd'
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/auth'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
const Signup = () => {
	const [auth, setAuth] = useContext(AuthContext)
	const [loading, setLoading] = useState(false)
	const router = useRouter()
	// -------------------------------------------------------------------------
	// If already signed in redirect to homepage
	// -------------------------------------------------------------------------
	useEffect(() => {
		if (auth.user) {
			router.push('/')
		}
	}, [])
	// -------------------------------------------------------------------------
	// Handle the Signup
	// -------------------------------------------------------------------------
	const handleSignup = async (values) => {
		setLoading(true)
		await axios
			.post('/auth/signup', values)
			.then((response) => response.data)
			.then((data) => {
				setAuth(data)
				localStorage.setItem('auth', JSON.stringify(data))
				toast.success('Signed up successfully')
				setLoading(false)
				router.push('/')
			})
			.catch((error) => {
				console.log(error.response.data.error)
				setLoading(false)
				toast.error(error.response.data.error)
			})
	}

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				flexDirection: 'column',
				alignItems: 'center',
				height: '70vh',
			}}>
			<h1 style={{ padding: '2.5rem' }}>Sign Up</h1>
			<Form
				name='normal_login'
				className='login-form'
				initialValues={{
					remember: true,
				}}
				onFinish={handleSignup}
				style={{ width: '30%', maxWidht: '360px' }}>
				<Form.Item
					name='name'
					rules={[
						{
							required: true,
							message: 'Please input your Name!',
						},
					]}>
					<Input
						prefix={<UserOutlined className='site-form-item-icon' />}
						placeholder='Name'
					/>
				</Form.Item>
				<Form.Item
					name='email'
					rules={[
						{
							required: true,
							message: 'Please input your Name!',
						},
					]}>
					<Input
						type='email'
						prefix={<MailOutlined className='site-form-item-icon' />}
						placeholder='Email'
					/>
				</Form.Item>
				<Form.Item
					name='password'
					rules={[
						{
							required: true,
							message: 'Please input your Password!',
						},
					]}>
					<Input
						prefix={<LockOutlined className='site-form-item-icon' />}
						type='password'
						placeholder='Password'
					/>
				</Form.Item>
				<Form.Item>
					<Button
						type='primary'
						htmlType='submit'
						className='login-form-button'
						loading={loading}>
						Signup
					</Button>
					&nbsp;Or <a href='/signin'>Signin</a>
				</Form.Item>
			</Form>
		</div>
	)
}
export default Signup
