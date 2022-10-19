import { useEffect, useState, useContext } from 'react'
import { Row, Col, Button, Input, List } from 'antd'
import AdminLayout from '../../../components/layouts/component.adminlayout'
import Link from 'next/link'
import { PlusOutlined } from '@ant-design/icons'
import axios from 'axios'
import { PostContext } from '../../../context/post'
import { useRouter } from 'next/router'
import { AuthContext } from '../../../context/auth'

function Posts() {
	// context
	const [auth, setAuth] = useContext(AuthContext)
	const [post, setPost] = useContext(PostContext)
	// state
	const [keyword, setKeyword] = useState('')
	// hook
	const router = useRouter()

	const { posts } = post

	useEffect(() => {
		if (auth?.token) fetchPosts()
	}, [auth?.token])

	const fetchPosts = async () => {
		try {
			const { data } = await axios.get('/post/posts-for-admin')
			setPost((prev) => ({ ...prev, posts: data }))
		} catch (err) {
			console.log(err)
		}
	}

	const handleEdit = async (post) => {
		// console.log("EDIT POST", post);
		return router.push(`/admin/posts/${post.slug}`)
	}

	const handleDelete = async (post) => {
		// console.log("DELETE POST", post);
		try {
			const answer = window.confirm('Are you sure you want to delete?')
			if (!answer) return
			const { data } = await axios.delete(`/post/${post._id}`)
			if (data.ok) {
				setPost((prev) => ({
					...prev,
					posts: prev.posts.filter((p) => p._id !== post._id),
				}))
			}
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<AdminLayout>
			<Row>
				<Col span={24}>
					<Button type='primary'>
						<Link href='/admin/posts/new'>
							<a>
								<PlusOutlined /> Add New
							</a>
						</Link>
					</Button>
					<h1 style={{ marginTop: 15 }}>{posts?.length} Posts</h1>

					<Input
						placeholder='Search'
						type='search'
						value={keyword}
						onChange={(e) => setKeyword(e.target.value.toLowerCase())}
					/>

					<PostsList
						posts={posts?.filter((p) =>
							p.title.toLowerCase().includes(keyword)
						)}
						handleEdit={handleEdit}
						handleDelete={handleDelete}
					/>
				</Col>
			</Row>
		</AdminLayout>
	)
}
const PostsList = ({ posts, handleDelete, handleEdit }) => {
	return (
		<List
			itemLayout='horizontal'
			dataSource={posts}
			renderItem={(item) => (
				<List.Item
					actions={[
						<a onClick={() => handleEdit(item)}>edit</a>,
						<a onClick={() => handleDelete(item)}>delete</a>,
					]}>
					<List.Item.Meta title={item.title} />
				</List.Item>
			)}
		/>
	)
}
export default Posts
