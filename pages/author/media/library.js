import { Row, Col } from 'antd'
import MediaLibrary from '../../../components/mediauploader/component.mediaLibrary'
import AuthorLayout from '../../../components/layouts/component.authorlayout'
function AdminMediaLibrary() {
	return (
		<AuthorLayout>
			<Row>
				<Col span={24}>
					<MediaLibrary />
				</Col>
			</Row>
		</AuthorLayout>
	)
}

export default AdminMediaLibrary
