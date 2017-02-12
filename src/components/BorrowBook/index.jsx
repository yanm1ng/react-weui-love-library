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

import {
	getBookList
} from '../../logic/book';

export default class BorrowBook extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			step: 1,
			form: {
				xiaoqu: '屏峰校区',
				name: '',
				xueyuan: '',
				xuehao: '',
				phone: ''
			},
			all: [],
			searched: [],
			checked: []
		};
	}
	componentDidMount() {
		var that = this;
		getBookList().then(function (books) {
			let all = [];
			for (let i = 0; i < books.length; i++) {
				let book = books[i].attributes;
				all.push({
					key: i,
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
	changeCheckBox(key) {
		const {
			checked
		} = this.state;

		const index = checked.indexOf(key);
		if (index == -1) {
			checked.push(key);
		} else {
			checked.splice(index, 1);
		}
		this.setState({
			checked
		})
	}
	render() {
		const {
			checked,
			form
		} = this.state;
		return (
			<div className="scroll-body">
				{this.state.step === 0 &&
					<div>
						<CellsTitle className="cell-title">第一步：信息填写</CellsTitle>
						<Form radio>
							<CellsTitle>校区信息</CellsTitle>
							<FormCell radio onClick={() => this.changeRadio('屏峰校区')}>
								<CellBody>屏峰校区</CellBody>
								<CellFooter>
									<Radio defaultChecked />
								</CellFooter>
							</FormCell>
							<FormCell radio onClick={() => this.changeRadio('朝晖校区')}>
								<CellBody>朝晖校区</CellBody>
								<CellFooter>
									<Radio />
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
						<CellsTitle className="cell-title">{form.xiaoqu + ' >> ' + form.name}</CellsTitle>
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
						<CellsTitle>剩余可选{5 - checked.length}本</CellsTitle>
						<Form checkbox>
							{
								this.state.all.map((book, i) => 
									<FormCell checkbox className="rich-checkbox">
										<CellHeader>
											<Checkbox checked={checked.indexOf(book.key) != -1} onClick={() => this.changeCheckBox(book.key)}/>
										</CellHeader>
										<CellBody>
											<div className="book-name">{book.name}</div>
											<div className="book-info">{book.author}#{book.publish}</div>
										</CellBody>
										<CellFooter>
											<div className="book-num">可借：{book.num}</div>
										</CellFooter>
									</FormCell>
								)
							}
						</Form>
					</div>
				}
			</div>
		)
	}
}