import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link, browserHistory } from 'react-router'
import 'weui';
import {
    Tab,
    TabBody,
    NavBar,
    NavBarItem
} from 'react-weui'

class App extends Component {
  render() {
    return (
            <Tab>
              <NavBar>
                  <NavBarItem ><Link to={`/order/daylist`}>今日订单</Link></NavBarItem>
                  <NavBarItem ><Link to={`/hotel/changehotel`}>新增订单</Link></NavBarItem>
              </NavBar>
              <TabBody>
                {this.props.children}
              </TabBody>
            </Tab>
    );
  }
};

export default App;
    