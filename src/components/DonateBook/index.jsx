import React from 'react';
import ReactDOM from 'react-dom';
import {
  Cell,
  CellsTitle,
  FormCell,
  Form,
  CellHeader,
  CellBody,
  Label,
  Input,
  CellsTips,
  Button,
  TextArea,
  Msg,
  Toptips
} from 'react-weui';

import './index.scss';

import {
  addDonate,
} from '../../logic/donate';

export default class DonateBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      show: false,
      text: '',
      timer: null,

      form: {
        name: '',
        xueyuan: '',
        qinshi: '',
        phone: '',
        num: '0',
        books: ''
      },
    };
  }
  componentWillUnmount() {
    this.state.timer && clearTimeout(this.state.timer);
  }
  handleInput(e, value) {
    const {
      form
    } = this.state;

    form[value] = e.target.value;

    this.setState({
      form
    });
  }
  backForward() {
    this.setState({
      success: false,
      form: {
        name: '',
        xueyuan: '',
        qinshi: '',
        phone: '',
        num: '0',
        books: ''
      },
    })
  }
  handleSubmit() {
    const {
      form
    } = this.state;
    const that = this;
    let bool = false;
    if (form.name.trim() === '') {
      bool = true;
    } else if (form.xueyuan.trim() === '') {
      bool = true;
    } else if (form.qinshi.trim() === '') {
      bool = true;
    } else if (form.phone.trim() === '') {
      bool = true;
    } else if (parseInt(form.num) <= 0) {
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
      addDonate(form).save().then(function(donate){
        that.setState({
          success: true
        })
      })
    }
  }
  render() {
    const {
      form
    } = this.state;
    return (
      <div className="scroll-body">
        {!this.state.success &&
          <div>
            <Toptips type="warn" show={this.state.show}>{this.state.text}</Toptips>
            <CellsTitle className="cell-title">信息填写</CellsTitle>
            <Form>
              <FormCell>
                <CellHeader>
                  <Label>姓名</Label>
                </CellHeader>
                <CellBody>
                  <Input type="text" placeholder="你的姓名" value={form.name} onChange={(e) => this.handleInput(e, 'name')} />
                </CellBody>
              </FormCell>
              <FormCell>
                <CellHeader>
                  <Label>学院</Label>
                </CellHeader>
                <CellBody>
                  <Input type="text" placeholder="你的学院" value={form.xueyuan} onChange={(e) => this.handleInput(e, 'xueyuan')} />
                </CellBody>
              </FormCell>
              <FormCell>
                <CellHeader>
                  <Label>寝室</Label>
                </CellHeader>
                <CellBody>
                  <Input type="text" placeholder="你的寝室" value={form.qinshi} onChange={(e) => this.handleInput(e, 'qinshi')} />
                </CellBody>
              </FormCell>
              <FormCell>
                <CellHeader>
                  <Label>联系方式</Label>
                </CellHeader>
                <CellBody>
                  <Input type="text" placeholder="长短号" value={form.phone} onChange={(e) => this.handleInput(e, 'phone')} />
                </CellBody>
              </FormCell>
              <FormCell>
                <CellHeader>
                  <Label>捐书数量</Label>
                </CellHeader>
                <CellBody>
                  <Input type="number" placeholder="捐书数量" value={form.num} onChange={(e) => this.handleInput(e, 'num')} />
                </CellBody>
              </FormCell>
              <Cell link>
                <CellBody>提示：捐书数量超过5本会有专人上门收书</CellBody>
              </Cell>
              {form.num >= 5 &&
                <FormCell>
                  <CellBody>
                    <TextArea placeholder="请备注书名" rows="3" maxlength="200" value={form.books} onChange={(e) => this.handleInput(e, 'books')}></TextArea>
                  </CellBody>
                </FormCell>
              }
            </Form>
            <CellsTips>请仔细填写以上信息</CellsTips>
            <Button className="large-btn" onClick={() => this.handleSubmit()}>确认提交</Button>
          </div>
        }
        {this.state.success &&
          <div>
            <Msg
              type="success"
              title="提交成功"
              description={parseInt(form.num) >= 5 ? '我们会安排工作人员三天内上门收书，收书时间：每周四中午12点到1点' : '收书时间地点：每周五中午12点到1点在朝晖老研楼103，屏峰西12架空层团学办公室'}
              buttons={[{
                type: 'primary',
                label: '返回',
                onClick: () => this.backForward()
              }]}
            />
          </div>
        }
      </div>
    )
  }
}