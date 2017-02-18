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
  Toptips,
  Picker,
  Toast
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

      loading_show: false,
      picker_show: false,
      picker_value: '环境学院',
      picker_group: [{
        items: [{
          label: '健行学院'
        },{
          label: '化学工程学院'
        },{
          label: '海洋学院'
        },{
          label: '材料科学与工程学院',
        },{
          label: '机械工程学院'
        },{
          label: '信息工程学院'
        },{
          label: '计算机科学与技术学院（软件学院）'
        },{
          label: '经贸管理学院'
        },{
          label: '建筑工程学院'
        },{
          label: '生物工程学院'
        },{
          label: '环境学院'
        },{
          label: '教育科学与技术学院'
        },{
          label: '外国语学院'
        },{
          label: '药学院 、绿色制药协同创新中心'
        },{
          label: '理学院'
        },{
          label: '人文学院'
        },{
          label: '艺术学院'
        },{
          label: '法学院'
        },{
          label: '政治与公共管理学院'
        },{
          label: '国际学院'
        }]
      }],

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
        qinshi: '',
        phone: '',
        num: '0',
        books: ''
      },
    })
  }
  handleSubmit() {
    const {
      form,
      picker_value
    } = this.state;
    const that = this;

    const regu = /^[1][3-9][0-9]{9}$/;
    const re = new RegExp(regu);

    let bool = false;
    if (form.name.trim() === '') {
      bool = true;
    } else if (form.qinshi.trim() === '') {
      bool = true;
    } else if (!re.test(form.phone)) {
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
      that.setState({
        loading_show: true
      })
      form.xueyuan = picker_value;
      addDonate(form).save().then(function(donate){
        that.setState({
          success: true,
          loading_show: false
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
            <Toast icon="loading" show={this.state.loading_show}>提交中...</Toast>
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
                  <Input
                    type="text"
                    onClick={e => {
                      e.preventDefault()
                      this.setState({ picker_show: true })
                    }}
                    placeholder="选择你所在的学院"
                    value={this.state.picker_value}
                    readOnly={true}
                  />
                </CellBody>
              </FormCell>
              <Picker
                lang={{leftBtn: '取消', rightBtn: '确定'}}
                onChange={(selected) => {
                  let value = '';
                  selected.forEach((s, i) => {
                    value = this.state.picker_group[i]['items'][s].label
                  })
                  this.setState({
                    picker_value: value,
                    picker_show: false
                  })
                }}
                groups={this.state.picker_group}
                show={this.state.picker_show}
                onCancel={e => this.setState({ picker_show: false })}
              />
              <FormCell>
                <CellHeader>
                  <Label>寝室</Label>
                </CellHeader>
                <CellBody>
                  <Input type="text" placeholder="你的寝室，需注明楼" value={form.qinshi} onChange={(e) => this.handleInput(e, 'qinshi')} />
                </CellBody>
              </FormCell>
              <FormCell>
                <CellHeader>
                  <Label>联系方式</Label>
                </CellHeader>
                <CellBody>
                  <Input type="number" placeholder="手机长号" value={form.phone} onChange={(e) => this.handleInput(e, 'phone')} />
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
              description={parseInt(form.num) >= 5 ? '我们会安排工作人员上门收书，收书时间：每周四中午12点到1点' : '收书时间地点：每周五中午12点到1点在朝晖老研楼103，屏峰西12架空层团学办公室'}
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