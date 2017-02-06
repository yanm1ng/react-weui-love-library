import React from 'react';
import ReactDOM from 'react-dom';
import { 
	Button,
	CellsTitle,
	CellsTips,
	Cell,
	CellHeader,
	CellBody,
	CellFooter,
	Form,
	FormCell,
	Icon,
	Input,
	Label,
	TextArea,
	Switch,
	Radio,
	Checkbox,
	Select,
	VCode,
	Agreement,
	Toptips
} from 'react-weui';

import './index.scss';

export default class BorrowBook extends React.Component {
	changeXiaoQu(value) {
		console.log(value);
	}
	render() {
		return (
			<div>
				<CellsTitle className="cell-title">第一步：信息填写</CellsTitle>
				<Form radio>
					<CellsTitle>校区信息</CellsTitle>
					<FormCell radio onClick={() => this.changeXiaoQu('pf')}>
							<CellBody>屏峰校区</CellBody>
							<CellFooter>
									<Radio name="radio" value="1" defaultChecked/>
							</CellFooter>
					</FormCell>
					<FormCell radio onClick={() => this.changeXiaoQu('zh')}>
							<CellBody>朝晖校区</CellBody>
							<CellFooter>
									<Radio name="radio" value="2"/>
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
									<Input type="text" placeholder="你的姓名"/>
							</CellBody>
					</FormCell>
					<FormCell>
							<CellHeader>
								<Label>学院</Label>
							</CellHeader>
							<CellBody>
									<Input type="text" placeholder="你的学院"/>
							</CellBody>
					</FormCell>
					<FormCell>
							<CellHeader>
								<Label>学号</Label>
							</CellHeader>
							<CellBody>
									<Input type="number" placeholder="你的学号"/>
							</CellBody>
					</FormCell>
					<FormCell>
							<CellHeader>
								<Label>联系方式</Label>
							</CellHeader>
							<CellBody>
									<Input type="text" placeholder="长短号"/>
							</CellBody>
					</FormCell>
				</Form>
				<Button className="large-btn">下一步</Button>
			</div>
		)
	}
}