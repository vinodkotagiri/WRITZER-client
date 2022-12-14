import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/auth'
import FullWidthImage from '../components/homepage/component.fullwidthimage'
import RenderProgress from '../components/renderProgress/component.renderprogress'
import { Row, Col, Divider, Button } from 'antd'
import Head from 'next/head'
import Link from 'next/link'
import ParallaxImage from '../components/homepage/component.parallaximage.jsx'
import { ThunderboltOutlined } from '@ant-design/icons'
import Footer from '../components/homepage/component.parallaximage.jsx'
import axios from 'axios'
import { Header } from 'antd/lib/layout/layout'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
function Home() {
	// context
	const [auth, setAuth] = useContext(AuthContext)
	// state for page customization
	const [title, setTitle] = useState('')
	const [subtitle, setSubtitle] = useState('')
	const [fullWidthImage, setFullWidthImage] = useState('')
	const [stats, setStats] = useState({})
	const [latestPosts, setLatestPosts] = useState([])
	const [categories, setCategories] = useState([])
	const getStats = async () => {
		await axios
			.get('/post/stats')
			.then((response) => setStats(response.data))
			.catch((err) => console.log(err))
	}

	const loadHomepage = async () => {
		try {
			const { data } = await axios.get('/page/home')
			console.log(data)
			setTitle(data.title)
			setSubtitle(data.subtitle)
			setFullWidthImage(data.fullWidthImage)
		} catch (err) {
			console.log(err)
		}
	}
	const getCategories = async () => {
		try {
			const { data } = await axios.get('category/all')
			setCategories(data)
		} catch (err) {
			console.log(err)
		}
	}
	const getLatestPosts = async () => {
		try {
			const { data } = await axios.get('/post/posts')
			setLatestPosts(data)
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		loadHomepage()
		getStats()
		getLatestPosts()
		getCategories()
	}, [])
	const router = useRouter()
	return (
		<Fragment>
			{!auth?.token ? (
				<>
					<Head>
						<title>WRITZER</title>
						<meta
							name='description'
							content='Read latest blog posts on web development'
						/>
					</Head>
					<Row
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							height: '100vh',
						}}>
						<Col
							span={12}
							style={{
								textAlign: 'left',
								lineHeight: 0.75,
								paddingLeft: '4.5rem',
							}}>
							<h1 style={{ fontSize: '8rem' }}>Writzer</h1>
							<p
								style={{ fontSize: '2rem', lineHeight: 1.05, fontWeight: 300 }}>
								An ultimate content management system <br />
								where you can create, manage and post your content
							</p>
							<Row>
								<Col
									span={6}
									style={{ marginTop: 50, textAlign: 'center', fontSize: 20 }}>
									<RenderProgress
										number={stats.posts}
										name='Posts'
										link={auth?.user?.role === 'Admin' ? '/admin/posts' : '/'}
									/>
								</Col>
								<Col
									span={6}
									style={{ marginTop: 50, textAlign: 'center', fontSize: 20 }}>
									<RenderProgress
										number={stats.comments ? stats.comments : '0'}
										name='Comments'
										link='/admin/comments'
									/>
								</Col>
								<Col
									span={6}
									style={{ marginTop: 50, textAlign: 'center', fontSize: 20 }}>
									<RenderProgress
										number={stats.categories}
										name='Categories'
										link={
											auth?.user?.role === 'Admin' ? '/admin/categories' : '/'
										}
									/>
								</Col>
								<Col
									span={6}
									style={{ marginTop: 50, textAlign: 'center', fontSize: 20 }}>
									<RenderProgress
										number={stats.users}
										name='Users'
										link={auth?.user?.role === 'Admin' ? '/admin/users1' : '/'}
									/>
								</Col>
							</Row>
							<Row
								style={{
									display: 'flex',
									justifyContent: 'center',
								}}>
								<Button
									onClick={() => router.push('/signup')}
									style={{
										backgroundColor: '#d268cc',
										padding: '0 2rem',
										fontWeight: 'bold',
										fontSize: '1.08rem',
										height: '3.25rem',
										marginTop: '2rem',
										width: '20rem',
										border: 'none',
										outline: 'none',
										borderRadius: '0.25rem',
										color: 'ghostwhite',
									}}>
									Get Started
								</Button>
							</Row>
						</Col>
						<Col span={12}>
							<img
								src='https://res.cloudinary.com/vinodkotagiri/image/upload/v1665332004/My%20Websites%20assets/portfolio-projects/storyio_bbq3ft.jpg'
								alt='writzer-hero'
								width='100%'
							/>
						</Col>
					</Row>
				</>
			) : (
				<>
					<Head>
						<title>WRITZER</title>
						<meta
							name='description'
							content='Read latest blog posts on web development'
						/>
					</Head>
					)
					<FullWidthImage
						title={title}
						subtitle={subtitle}
						fullWidthImage={fullWidthImage?.url}
					/>
					<Row style={{ marginTop: 40 }}>
						{/* posts */}
						<Col
							span={6}
							style={{ marginTop: 50, textAlign: 'center', fontSize: 20 }}>
							<RenderProgress
								number={stats.posts}
								name='Posts'
								link={auth?.user?.role === 'Admin' ? '/admin/posts' : '/'}
							/>
						</Col>
						{/* comments */}
						<Col
							span={6}
							style={{ marginTop: 50, textAlign: 'center', fontSize: 20 }}>
							<RenderProgress
								number={stats.comments === NaN ? 0 : stats.comments}
								name='Comments'
								link='/admin/comments'
							/>
						</Col>
						{/* catgories */}
						<Col
							span={6}
							style={{ marginTop: 50, textAlign: 'center', fontSize: 20 }}>
							<RenderProgress
								number={stats.categories}
								name='Categories'
								link={auth?.user?.role === 'Admin' ? '/admin/categories' : '/'}
							/>
						</Col>
						{/* users */}
						<Col
							span={6}
							style={{ marginTop: 50, textAlign: 'center', fontSize: 20 }}>
							<RenderProgress
								number={stats.users}
								name='Users'
								link={auth?.user?.role === 'Admin' ? '/admin/users1' : '/'}
							/>
						</Col>
					</Row>
					<Row>
						<Col span={24}>
							<ParallaxImage>
								<h2
									style={{
										textAlign: 'center',
										fontSize: '74px',
										textShadow: '2px 2px 4px #000000',
										color: '#fff',
									}}>
									BLOG POSTS
								</h2>
								<Divider>
									<ThunderboltOutlined />
								</Divider>
								<div style={{ textAlign: 'center' }}>
									{latestPosts.map((post) => (
										<Link href={`/post/${post.slug}`} key={post._id}>
											<a>
												<h3>{post.title}</h3>
											</a>
										</Link>
									))}
								</div>
							</ParallaxImage>
						</Col>
					</Row>
					<Row>
						<Col
							span={24}
							style={{ textAlign: 'center', marginTop: 80, marginBottom: 80 }}>
							<Divider>CATEGORIES</Divider>
							<div style={{ textAlign: 'center' }}>
								{categories.map((c) => (
									<Link href={`/category/${c.slug}`} key={c._id}>
										<a>
											<Button style={{ margin: 2 }}>{c.name}</Button>
										</a>
									</Link>
								))}
							</div>
						</Col>
					</Row>
					<Footer />
				</>
			)}
		</Fragment>
	)
}

export default Home
