import React from 'react';
import ReactDOM from 'react-dom';
import { 
	CellsTitle,
	FormCell,
	Form,
	CellHeader,
	CellBody,
	Label,
	Input,
	CellsTips,
	Button,
	TextArea,
	Msg
} from 'react-weui';

import './index.scss';

export default class DonateBook extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			success: true,
			form: {
				name: '',
				xueyuan: '',
				qinshi: '',
				phone: '',
				num: 8,
				book: ''
			},
		};
	}
	handleSubmit() {

	}
	render() {
		return (
			<div className="scroll-body">
				{ !this.state.success &&
					<div>
						<CellsTitle className="cell-title">信息填写</CellsTitle>
						<Form>
							<FormCell>
								<CellHeader>
									<Label>姓名</Label>
								</CellHeader>
								<CellBody>
									<Input type="text" placeholder="你的姓名" id="name" />
								</CellBody>
							</FormCell>
							<FormCell>
								<CellHeader>
									<Label>学院</Label>
								</CellHeader>
								<CellBody>
									<Input type="text" placeholder="你的学院" id="xueyuan" />
								</CellBody>
							</FormCell>
							<FormCell>
								<CellHeader>
									<Label>寝室</Label>
								</CellHeader>
								<CellBody>
									<Input type="text" placeholder="你的寝室" id="qinshi" />
								</CellBody>
							</FormCell>
							<FormCell>
								<CellHeader>
									<Label>联系方式</Label>
								</CellHeader>
								<CellBody>
									<Input type="number" placeholder="长短号" id="phone" />
								</CellBody>
							</FormCell>
							<FormCell>
								<CellHeader>
									<Label>捐书数量</Label>
								</CellHeader>
								<CellBody>
									<Input type="number" placeholder="捐书数量" id="num" />
								</CellBody>
							</FormCell>
							{	this.state.form.num > 5 &&
								<FormCell>
									<CellBody>
										<TextArea placeholder="请备注书名" rows="3" maxlength="200"></TextArea>
									</CellBody>
								</FormCell>
							}
						</Form>
						<CellsTips>请仔细填写以上信息</CellsTips>
						<Button className="large-btn" onClick={() => this.handleSubmit()}>确认提交</Button>
					</div>
				}
				{ this.state.success &&
					<div>
						<Msg
							type="success"
							title="Action Success"
							description="We have received your feedback"
							buttons={[{
									type: 'primary',
									label: 'Ok',
									onClick: false
							}, {
									type: 'default',
									label: 'Cancel',
									onClick: false
							}]}
						/>
					</div>
				}
      </div>
		)
	}
}