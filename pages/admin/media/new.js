import { Row, Col } from 'antd'
import AdminLayout from '../../../components/layouts/component.adminlayout'
import UploadFile from '../../../components/mediauploader/component.uploadfile'

function NewMedia() {
	return (
		<AdminLayout>
			<Row>
				<Col span={24}>
					<div
						style={{
							padding: 100,
							textAlign: 'center',
						}}>
						<UploadFile redirectToLibrary={true} />
					</div>
				</Col>
			</Row>
		</AdminLayout>
	)
}

export default NewMedia
