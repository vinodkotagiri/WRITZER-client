import React, { useState, useEffect } from 'react'
import { Row, Col, Divider } from 'antd'
import AdminLayout from '../../components/layouts/component.adminlayout'
import RenderProgress from '../../components/renderProgress/component.renderprogress'
import axios from 'axios'
const index = () => {
	// state
	const [numbers, setNumbers] = useState({})
	const getNumbers = async () => {
		await axios
			.get('/post/stats')
			.then((response) => setNumbers(response.data))
			.catch((err) => console.log(err))
	}

	useEffect(() => {
		getNumbers()
	}, [])

	console.log(numbers)
	return (
		<AdminLayout>
			<Row>
				<Col span={24}>
					<Divider>
						<h1>Statistics</h1>
					</Divider>
				</Col>
			</Row>

			<Row>
				{/* posts */}
				<Col
					span={12}
					style={{ marginTop: 50, textAlign: 'center', fontSize: 20 }}>
					<RenderProgress
						number={numbers.posts}
						name='Posts'
						link='/admin/posts'
					/>
				</Col>
				{/* comments */}
				<Col
					span={12}
					style={{ marginTop: 50, textAlign: 'center', fontSize: 20 }}>
					<RenderProgress
						number={numbers.comments}
						name='Comments'
						link='/admin/comments'
					/>
				</Col>
			</Row>

			<Row>
				{/* catgories */}
				<Col
					span={12}
					style={{ marginTop: 50, textAlign: 'center', fontSize: 20 }}>
					<RenderProgress
						number={numbers.categories}
						name='Categories'
						link='/admin/categories'
					/>
				</Col>
				{/* users */}
				<Col
					span={12}
					style={{ marginTop: 50, textAlign: 'center', fontSize: 20 }}>
					<RenderProgress
						number={numbers.users}
						name='Users'
						link='/admin/users'
					/>
				</Col>
			</Row>
		</AdminLayout>
	)
}

export default index
