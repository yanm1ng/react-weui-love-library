import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import createHashHistory from 'history/lib/createHashHistory'
const history = createHashHistory({ queryKey: false });

import { Button, Tab, TabBarItem } from 'react-weui';
import BorrowBook from '../components/BorrowBook/index';
import DonateBook from '../components/DonateBook/index';
import ListBook from '../components/ListBook/index';

import IconA from '../images/icon-a.png';
import IconB from '../images/icon-b.png';
import IconC from '../images/icon-c.png';

import 'weui';
import './index.scss';
import 'react-weui/build/packages/react-weui.css';

class App extends React.Component {
  handleHashIndex(e) {
    const router = e == 0 ? '#borrow' : e == 1 ? '#donate' : '#list';
    window.location.hash = router;
  }
  render() {
    return (
      <div className="main-body">
        <Router history={history}>
          <Route path="/">
            <IndexRoute component={BorrowBook} />
            <Route path="/borrow" component={BorrowBook} />
            <Route path="/donate" component={DonateBook} />
            <Route path="/list" component={ListBook} />
          </Route>
        </Router>
        <Tab type="tabbar" className="tabbar" onChange={this.handleHashIndex}>
          <TabBarItem icon={<img src="//gw.alicdn.com/tfs/TB1ZrRso2DH8KJjy1XcXXcpdXXa-81-81.png" />} label="借书"></TabBarItem>
          <TabBarItem icon={<img src="//gw.alicdn.com/tfs/TB1M8e.myqAXuNjy1XdXXaYcVXa-81-81.png" />} label="捐书"></TabBarItem>
          <TabBarItem icon={<img src="//gw.alicdn.com/tfs/TB1JQ9.myqAXuNjy1XdXXaYcVXa-81-81.png" />} label="书目"></TabBarItem>
        </Tab>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('react-app')
);
