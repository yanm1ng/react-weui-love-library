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

export default class BorrowBook extends React.Component {
	render() {
		return (
			<div>
				<Form>
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
									<Input type="text" placeholder="你的学号"/>
							</CellBody>
					</FormCell>
				</Form>	
			</div>
		)
	}
}