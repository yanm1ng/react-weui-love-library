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
  Toptips,
  Msg,
  Dialog
} from 'react-weui';

import './index.scss';

import {
  getBookList,
  borrowBook
} from '../../logic/book';

export default class BorrowBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialog: false,
      show: false,
      text: '',
      timer: null,

      step: 0,

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
  handleInput(e, value) {
    const {
      step1
    } = this.state;

    step1[value] = e.target.value;

    this.setState({
      step1
    });
  }
  handleStep(step) {
    if (step == 0) {
      this.setState({
        step
      });
    } else if (step == 1) {
      const {
        step1
      } = this.state;

      let bool = false;
      if (step1.name.trim() === '') {
        bool = true;
      } else if (step1.xueyuan.trim() === '') {
        bool = true;
      } else if (step1.xuehao.length < 12) {
        bool = true;
      } else {

      }
      if (bool) {
        this.setState({
          show: true,
          text: '请检查表单信息是否填写正确'
        });

        this.state.timer = setTimeout(() => {
          this.setState({
            show: false
          });
        }, 2000);
      } else {
        this.setState({
          step
        });
      }
    } else if (step == 2) {
      const {
        checked
      } = this.state.step2;
      for (let i = 0; i < checked.length; i++) {
        borrowBook(checked[i]);
      }
      this.setState({
        dialog: false,
        step
      })
    }
  }
  changeCheckBox(key, id) {
    const {
      step2
    } = this.state;
    const {
      checked,
      all
    } = step2;

    const index = checked.indexOf(id);
    if (all[parseInt(key)].num == 0) {
      this.setState({
        show: true,
        text: '该书库存少于1本，暂不可借'
      });

      this.state.timer = setTimeout(() => {
        this.setState({
          show: false
        });
      }, 2000);
      return;
    }
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
      checked.push(id);
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
  handleDialog() {
    this.setState({
      dialog: !this.state.dialog
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
                  <Radio checked={step1.xiaoqu == '屏峰校区'} />
                </CellFooter>
              </FormCell>
              <FormCell radio onClick={() => this.changeRadio('朝晖校区')}>
                <CellBody>朝晖校区</CellBody>
                <CellFooter>
                  <Radio checked={step1.xiaoqu == '朝晖校区'} />
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
                  <Input type="text" placeholder="你的姓名" value={step1.name} onChange={(e) => this.handleInput(e, 'name')} />
                </CellBody>
              </FormCell>
              <FormCell>
                <CellHeader>
                  <Label>学院</Label>
                </CellHeader>
                <CellBody>
                  <Input type="text" placeholder="你的学院" value={step1.xueyuan} onChange={(e) => this.handleInput(e, 'xueyuan')} />
                </CellBody>
              </FormCell>
              <FormCell>
                <CellHeader>
                  <Label>学号</Label>
                </CellHeader>
                <CellBody>
                  <Input type="number" placeholder="你的学号" value={step1.xuehao} onChange={(e) => this.handleInput(e, 'xuehao')} />
                </CellBody>
              </FormCell>
              <FormCell>
                <CellHeader>
                  <Label>联系方式</Label>
                </CellHeader>
                <CellBody>
                  <Input type="text" placeholder="长短号" value={step1.phone} onChange={(e) => this.handleInput(e, 'phone')} />
                </CellBody>
              </FormCell>
            </Form>
            <CellsTips>请仔细填写以上信息</CellsTips>
            <Button className="large-btn" onClick={() => this.handleStep(1)}>下一步</Button>
          </div>
        }
        {this.state.step === 1 &&
          <div>
            <Dialog title="注意事项" buttons={[{
              type: 'default',
              label: '取消',
              onClick: this.handleDialog.bind(this)
            },{
              type: 'primary',
              label: '同意',
              onClick: () => this.handleStep(2)
            }]} show={this.state.dialog}>
              请爱护图书，还书将于期末由专人短信通知
            </Dialog>
            <CellsTitle className="cell-title" onClick={() => this.handleStep(0)}>{'<< 返回上一步'}</CellsTitle>
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
              <Button size="small" className="right-mini-btn" type={checked.length > 0 ? 'primary' : 'default'} onClick={() => this.handleDialog()}>选好了</Button>
            </CellsTitle>
            <Form checkbox className="margin-form">
              {
                data.map((book, i) =>
                  <FormCell checkbox className="rich-checkbox">
                    <CellHeader>
                      <Checkbox checked={checked.indexOf(book.id) != -1} onClick={() => this.changeCheckBox(book.key, book.id)} />
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
        {this.state.step === 2 &&
          <div>
            <Msg
              type="success"
              title="借阅成功"
              description="取书时间地点"
              buttons={[{
                type: 'primary',
                label: '确定',
                onClick: () => this.handleStep(0)
              },]}
            />
          </div>
        }
      </div>
    )
  }
}