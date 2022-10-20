import { Row, Col } from 'antd'
import AuthorLayout from '../../../components/layouts/component.authorlayout'
import UploadFile from '../../../components/mediauploader/component.uploadfile'

function NewMedia() {
	return (
		<AuthorLayout>
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
		</AuthorLayout>
	)
}

export default NewMedia
