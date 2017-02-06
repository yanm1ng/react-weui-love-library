import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { Button, Tab, TabBarItem } from 'react-weui';
import BorrowBook from '../component/BorrowBook/index';
import DonateBook from '../component/DonateBook/index';
import ListBook from '../component/ListBook/index';

import IconA from '../images/icon-a.png';
import IconB from '../images/icon-b.png';
import IconC from '../images/icon-c.png';

import 'weui';
import './index.scss';
import 'react-weui/lib/react-weui.min.css';

class App extends React.Component {
	handleHashIndex(e) {
		const router = e == 0 ? '#borrow' : e == 1 ? '#donate' : '#list'; 
		window.location.hash = router;
	}
	render() {
		return (
			<div>
				<Tab type="tabbar" className="tabbar" onChange={this.handleHashIndex}>
					<TabBarItem icon={<img src={IconA}/>} label="借书"></TabBarItem>
					<TabBarItem icon={<img src={IconB}/>} label="捐书"></TabBarItem>
					<TabBarItem icon={<img src={IconC}/>} label="书目"></TabBarItem>
				</Tab>
				<Router>
					<Route path="/">
						<IndexRoute component={BorrowBook}/>
						<Route path="/borrow" component={BorrowBook}/>
						<Route path="/donate" component={DonateBook}/>
    				<Route path="/list" component={ListBook}/>
					</Route>
				</Router>
			</div>
		)
	}
}

ReactDOM.render(
    <App />,
    document.getElementById('react-content')
);
