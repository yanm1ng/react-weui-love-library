import React from 'react';
import ReactDOM from 'react-dom';
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
	Radio,
	Select,
	Checkbox
 } from 'react-weui';

import './index.scss';

export default class ListBook extends React.Component {
	render() {
		return (
			<div className="scroll-body">
				<div>
					<CellsTitle className="cell-title">所有书目</CellsTitle>
					<Form>
						<FormCell select selectPos="before" className="select-form">
							<CellHeader>
								<Select className="select-list">
									<option value="1">书名</option>
									<option value="2">作者</option>
									<option value="3">出版社</option>
								</Select>
							</CellHeader>
							<CellBody>
								<Input type="text" />
							</CellBody>
							<CellFooter>
								<Button type="vcode" className="search-btn">搜索</Button>
							</CellFooter>
						</FormCell>
					</Form>
				</div>
			</div>
		)
	}
}