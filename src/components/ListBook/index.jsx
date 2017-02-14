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
      type: '0',
      value: '',
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
          key: i,
          id: books[i].id,
          author: book.author || '',
          name: book.name || '',
          num: book.num || 0,
          publish: book.publish || '',
        })
      }
      that.setState({
        all
      })
    });
  }
  handleSelect(e) {
    const type = e.target.value;
    this.setState({
      type
    })
  }
  handleChange(e) {
    const value = e.target.value;
    const searched = value === '' ? [] : this.state.searched;
    this.setState({
      value,
      searched
    })
  }
  handleSearch() {
    const {
      type,
      value,
      all
    } = this.state;

    const options = ['name', 'author', 'publish'];
    const property = options[parseInt(type)];
    let searched = [];

    for (let i = 0; i < all.length; i++) {
      if (all[i][property].indexOf(value) != -1) {
        searched.push(all[i])
      }
    }
    this.setState({
      searched
    })
  }
  render() {
    const {
      searched,
      all
    } = this.state;
    const data = searched.length > 0 ? searched : all;
    return (
      <div className="scroll-body">
        <div>
          <CellsTitle className="cell-title">所有书目</CellsTitle>
          <Form>
            <FormCell select selectPos="before" className="select-form">
              <CellHeader>
                <Select className="select-list" onChange={this.handleSelect.bind(this)}>
                  <option value="0">书名</option>
                  <option value="1">作者</option>
                  <option value="2">出版社</option>
                </Select>
              </CellHeader>
              <CellBody>
                <Input type="text" onChange={this.handleChange.bind(this)} />
              </CellBody>
              <CellFooter>
                <Button type="vcode" className="search-btn" onClick={this.handleSearch.bind(this)}>搜索</Button>
              </CellFooter>
            </FormCell>
          </Form>
          <div>
            <Cells className="full-cell">
              {
                data.map((book, i) =>
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