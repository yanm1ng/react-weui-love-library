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
  Checkbox,
  Toptips
} from 'react-weui';

import './index.scss';

import {
  getBookList
} from '../../logic/book';

export default class BorrowBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      text: '',
      timer: null,

      step: 1,

      step1: {
        xiaoqu: '屏峰校区',
        name: '',
        xueyuan: '',
        xuehao: '',
        phone: ''
      },
      step2: {
        type: '0',
        value: '',
        all: [],
        searched: [],
        checked: []
      }
    };
  }
  componentDidMount() {
    const that = this;
    const {
      step2
    } = that.state;
    getBookList().then(function (books) {
      let all = [];
      for (let i = 0; i < books.length; i++) {
        let book = books[i].attributes;
        all.push({
          key: i,
          id: books[i].id,
          author: book.author || '',
          name: book.name || '',
          num: book.num || 0,
          publish: book.publish || '',
        })
      }
      step2.all = all;
      that.setState({
        step2
      })
    });
  }
  componentWillUnmount() {
    this.state.timer && clearTimeout(this.state.timer);
  }
  changeRadio(value) {
    const {
      step1
    } = this.state;

    step1.xiaoqu = value;
    this.setState({
      step1
    });
  }
  handleStep(step) {
    const {
      step1
    } = this.state;

    if (step === 1) {
      const arr = ['name', 'xueyuan', 'xuehao', 'phone'];
      arr.forEach(index => {
        step1[index] = document.getElementById(index).value.trim();
      });
      this.setState({
        step1,
        step
      });
    }
  }
  changeCheckBox(key) {
    const {
      step2
    } = this.state;
    const {
      checked
    } = step2;

    const index = checked.indexOf(key);
    if (checked.length >= 5 && index == -1) {
      this.setState({
        show: true,
        text: '你最多可以选5本书'
      });

      this.state.timer = setTimeout(() => {
        this.setState({
          show: false
        });
      }, 2000);
      return;
    }
    if (index == -1) {
      checked.push(key);
    } else {
      checked.splice(index, 1);
    }
    step2.checked = checked;
    this.setState({
      checked
    })
  }
  changeSelect(e) {
    const {
      step2
    } = this.state;

    const type = e.target.value;
    step2.type = type;
    this.setState({
      step2
    })
  }
  changeSearch(e) {
    const {
      step2
    } = this.state;

    const value = e.target.value;
    const searched = value === '' ? [] : step2.searched;

    step2.value = value;
    step2.searched = searched;
    this.setState({
      step2
    })
  }
  handleSearch() {
    const {
      step2
    } = this.state;

    const {
      type,
      value,
      all
    } = step2;

    const options = ['name', 'author', 'publish'];
    const property = options[parseInt(type)];
    let searched = [];

    for (let i = 0; i < all.length; i++) {
      if (all[i][property].indexOf(value) != -1) {
        searched.push(all[i])
      }
    }

    step2.searched = searched;
    this.setState({
      step2
    })
  }
  render() {
    const {
      step1,
      step2
    } = this.state;
    const {
      searched,
      all,
      checked
    } = step2;
    const data = searched.length > 0 ? searched : all;
    return (
      <div className="scroll-body">
        <Toptips type="warn" show={this.state.show}>{this.state.text}</Toptips>
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
            <CellsTitle className="cell-title">{step1.xiaoqu + ' >> ' + step1.name}</CellsTitle>
            <Form>
              <FormCell select selectPos="before" className="select-form">
                <CellHeader>
                  <Select className="select-list" onChange={this.changeSelect.bind(this)}>
                    <option value="0">书名</option>
                    <option value="1">作者</option>
                    <option value="2">出版社</option>
                  </Select>
                </CellHeader>
                <CellBody>
                  <Input type="text" onChange={this.changeSearch.bind(this)} />
                </CellBody>
                <CellFooter>
                  <Button type="vcode" className="search-btn" onClick={this.handleSearch.bind(this)}>搜索</Button>
                </CellFooter>
              </FormCell>
            </Form>
            <CellsTitle>
              <div className="remain-num">剩余可选{5 - checked.length}本</div>
              <Button size="small" className="right-mini-btn" type={checked.length > 0 ? 'primary' : 'default'}>选好了</Button>
            </CellsTitle>
            <Form checkbox className="margin-form">
              {
                data.map((book, i) =>
                  <FormCell checkbox className="rich-checkbox">
                    <CellHeader>
                      <Checkbox checked={checked.indexOf(book.key) != -1} onClick={() => this.changeCheckBox(book.key)} />
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