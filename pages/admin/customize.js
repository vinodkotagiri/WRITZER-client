import { useState, useContext, useEffect } from 'react'
import { Row, Col, Input, Button, Image, Divider } from 'antd'
import Media from '../../components/mediauploader/'
import { MediaContext } from '../../context/media'
import axios from 'axios'
import toast from 'react-hot-toast'
import AdminLayout from '../../components/layouts/component.adminlayout'

const Customize = () => {
	const [title, setTitle] = useState('')
	const [subtitle, setSubtitle] = useState('')
	const [fullWidthImage, setFullWidthImage] = useState('')
	const loadHomePage = async () => {
		// state
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
	useEffect(() => {
		loadHomePage()
	}, [])
	// context
	const [media, setMedia] = useContext(MediaContext)

	const [loading, setLoading] = useState('')

	const handleSave = async () => {
		try {
			setLoading(true)
			const { data } = await axios.post('/page', {
				page: 'home',
				title,
				subtitle,
				fullWidthImage: media?.selected?._id,
			})
			setLoading(false)
			toast.success('Saved')
		} catch (err) {
			console.log(err)
			setLoading(false)
		}
	}

	return (
		<AdminLayout>
			<Row>
				<Col span={24}>
					<Divider>
						<h1>Customize home page</h1>
						<p>Set full width image title and subtitle</p>
					</Divider>
				</Col>

				<Col span={18}>
					<Media />

					<Input
						style={{ margin: '20px 0px 20px 0px' }}
						size='large'
						placeholder='Give it a title'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>

					<Input
						size='large'
						placeholder='Give it a subtitle'
						value={subtitle}
						onChange={(e) => setSubtitle(e.target.value)}
					/>

					<Button
						onClick={handleSave}
						type='default'
						style={{ margin: '10px 0px 10px 0px' }}
						loading={loading}
						block>
						Save
					</Button>
				</Col>

				<Col span={6}>
					<div style={{ margin: '40px 0px 0px 20px' }}>
						{media?.selected ? (
							<Image width='100%' src={media?.selected?.url} />
						) : fullWidthImage ? (
							<Image width='100%' src={fullWidthImage.url} />
						) : (
							''
						)}
					</div>
				</Col>
			</Row>
		</AdminLayout>
	)
}

export default Customize
