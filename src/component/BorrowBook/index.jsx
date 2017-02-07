import React from 'react';
import ReactDOM from 'react-dom';
import AV from 'leancloud-storage';
import {
	Button,
	CellsTitle,
	Cell,
	CellHeader,
	CellBody,
	CellFooter,
	CellsTips,
	Form,
	FormCell,
	Icon,
	Input,
	Label,
	Radio
} from 'react-weui';

import './index.scss';

AV.init({
  appId: '48J8TbEpg8GsjtKeY88jXaze-gzGzoHsz',
  appKey: '55vgWsLWUenIJWdJPCGn1OhJ'
});

export default class BorrowBook extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			step: 0,
			form: {
				xiaoqu: '屏峰校区',
				name: '',
				xueyuan: '',
				xuehao: '',
				phone: ''
			}
		};
	}
	componentDidMount() {
		
	}
	changeRadio(value) {
		const {
			form
		} = this.state;
		form.xiaoqu = value;
		this.setState({
			form
		});
	}
	handleStep(step) {
		const {
			form
		} = this.state;

		if (step === 1) {
			const arr = ['name', 'xueyuan', 'xuehao', 'phone'];
			arr.forEach(index => {
				form[index] = document.getElementById(index).value.trim();
			});
			this.setState({
				form,
				step
			});
		}
	}
	render() {
		return (
			<div className="scroll-body">
				{	this.state.step === 0 &&
					<div>
						<CellsTitle className="cell-title">第一步：信息填写</CellsTitle>
						<Form radio>
							<CellsTitle>校区信息</CellsTitle>
							<FormCell radio onClick={() => this.changeRadio('屏峰校区')}>
								<CellBody>屏峰校区</CellBody>
								<CellFooter>
									<Radio name="radio" value="1" defaultChecked />
								</CellFooter>
							</FormCell>
							<FormCell radio onClick={() => this.changeRadio('朝晖校区')}>
								<CellBody>朝晖校区</CellBody>
								<CellFooter>
									<Radio name="radio" value="2" />
								</CellFooter>
							</FormCell>
						</Form>
						<Form>
							<CellsTitle>个人信息</CellsTitle>
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
									<Label>学号</Label>
								</CellHeader>
								<CellBody>
									<Input type="number" placeholder="你的学号" id="xuehao" />
								</CellBody>
							</FormCell>
							<FormCell>
								<CellHeader>
									<Label>联系方式</Label>
								</CellHeader>
								<CellBody>
									<Input type="text" placeholder="长短号" id="phone" />
								</CellBody>
							</FormCell>
						</Form>
						<CellsTips>请仔细填写以上信息</CellsTips>
						<Button className="large-btn" onClick={() => this.handleStep(1)}>下一步</Button>
					</div>
				}
				{this.state.step === 1 &&
					<div>
						<CellsTitle className="cell-title">{this.state.form.xiaoqu + ' >> ' + this.state.form.name}</CellsTitle>
					</div>
				}
			</div>
		)
	}
}