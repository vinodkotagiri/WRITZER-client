import { Row, Col } from 'antd'
import AdminLayout from '../../../components/layouts/component.adminlayout'
import MediaLibrary from '../../../components/mediauploader/component.mediaLibrary'

function AdminMediaLibrary() {
	return (
		<AdminLayout>
			<Row>
				<Col span={24}>
					<MediaLibrary />
				</Col>
			</Row>
		</AdminLayout>
	)
}

export default AdminMediaLibrary
