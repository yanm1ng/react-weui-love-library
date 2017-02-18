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
  Checkbox,
  Popup,
  Picker,
  Badge
} from 'react-weui';

import './index.scss';

import {
  getBookList
} from '../../logic/book';

export default class ListBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      picker_show: false,
      picker_value: '全部',
      picker_group: [{
        items: [{
          label: '全部'
        },{
          label: '大一'
        },{
          label: '大二',
        },{
          label: '大三'
        },{
          label: '大四'
        },{
          label: '考研'
        },{
          label: '考公'
        },{
          label: '考级'
        },{
          label: '复习资料'
        },{
          label: '其他学院'
        }]
      }],
      type: '0',
      value: '',
      all: [],
      searched: [],
      picked:[],
      count: 0
    };
  }
  hide() {
    this.setState({
      picker_show: false,
    })
  }
  componentDidMount() {
    var that = this;
    getBookList().then(function (books) {
      let all = [];
      let count = 0;
      for (let i = 0; i < books.length; i++) {
        let book = books[i].attributes;
        all.push({
          key: i,
          id: books[i].id,
          author: book.author || '',
          name: book.name || '',
          num: book.num || 0,
          publish: book.publish || '',
          type: book.type
        })
        count += book.num;
      }
      that.setState({
        all,
        count
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
    let {
      searched,
      picker_value
    } = this.state;

    const value = e.target.value;
    searched = value === '' ? [] : searched;
    picker_value = value === '' ? '全部' : picker_value;

    this.setState({
      value,
      searched,
      picker_value
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
      searched,
      picker_value: '全部'
    })
  }
  handlePicker(selected) {
    const {
      all,
      searched
    } = this.state;

    let value = '';
    selected.forEach((s, i) => {
      value = this.state.picker_group[i]['items'][s].label
    })

    if (value === '全部') {
      this.setState({
        picker_value: value,
        picker_show: false,
        picked: []
      })
      return;
    }

    const data = searched.length > 0 ? searched : all;
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].type === value) {
        arr.push(data[i])
      }
    }

    if (arr.length > 0) {
      this.setState({
        picked: arr,
        picker_value: value,
        picker_show: false
      })
    } else {
      this.setState({
        picker_show: false
      })
      alert('找不到该分类');
    }
  }
  render() {
    const {
      searched,
      all,
      picked,
      picker_value
    } = this.state;
    let data = searched.length > 0 ? searched : all;
    data = picker_value == '全部' ? data : picked;

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
          <Form style={{marginTop: 0}}>
            <FormCell>
              <CellHeader>
                <Label>图书分类</Label>
              </CellHeader>
              <CellBody>
                <Input
                  type="text"
                  onClick={e => {
                    e.preventDefault()
                    this.setState({ picker_show: true })
                  }}
                  placeholder="请选择一个分类"
                  value={this.state.picker_value}
                  readOnly={true}
                />
              </CellBody>
            </FormCell>
          </Form>
          <Picker
            lang={{leftBtn: '取消', rightBtn: '确定'}}
            onChange={(selected) => this.handlePicker(selected)}
            groups={this.state.picker_group}
            show={this.state.picker_show}
            onCancel={e => this.setState({ picker_show: false })}
          />
          <div>
            <CellsTitle className="cell-title">绿色书库当前共有{this.state.count}本书</CellsTitle>
            <Cells className="full-cell">
              {
                data.map((book, i) =>
                  <Cell className="rich-cell" key={i}>
                    <CellBody>
                      <div className="book-name">{book.name}</div>
                      <div className="book-info">{book.author}#{book.publish}</div>
                    </CellBody>
                    <CellFooter>
                      <div className="book-num">
                        <Badge preset="body" className={
                          ['大一', '大二', '大三', '大四'].indexOf(book.type) != -1 ? 'blue-badge'
                          :
                          ['考研', '考公', '考级'].indexOf(book.type) != -1 ? 'red-badge'
                          :
                          ['复习资料'].indexOf(book.type) != -1 ? 'green-badge'
                          :
                          'grey-badge'
                        }>{book.type}</Badge>
                      </div>
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