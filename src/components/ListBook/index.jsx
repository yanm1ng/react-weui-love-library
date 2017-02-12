import React from 'react';
import ReactDOM from 'react-dom';
import {
	Button,
	Cells,
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

import {
	getBookList
} from '../../logic/book';

export default class ListBook extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			all: [],
			searched: [],
		};
	}
	componentDidMount() {
		var that = this;
		getBookList().then(function (books) {
			let all = [];
			for (let i = 0; i < books.length; i++) {
				let book = books[i].attributes;
				all.push({
					id: books[i].id,
					author: book.author,
					name: book.name,
					num: book.num,
					publish: book.publish,
				})
			}
			that.setState({
				all
			})
		});
	}
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
					<div>
						<Cells className="full-cell">
							{
								this.state.all.map((book, i) => 
									<Cell className="rich-cell">
										<CellBody>
											<div className="book-name">{book.name}</div>
											<div className="book-info">{book.author}#{book.publish}</div>
										</CellBody>
										<CellFooter>
											<div className="book-num">可借：{book.num}</div>
										</CellFooter>
									</Cell>
								)
							}
						</Cells>
					</div>
				</div>
			</div>
		)
	}
}