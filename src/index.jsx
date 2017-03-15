import React from 'react';
import { render } from 'react-dom';
// import { AppContainer } from 'react-hot-loader';


import App from './App';
import HotelListView from './module/hotel/HotelListView'
import HotelFormView from './module/hotel/HotelFormView'
import HotelMangeView from './module/hotel/HotelMangeView'
import HotelChangeView from './module/hotel/HotelChangeView'
import OrderListView from './module/order/OrderListView'
import OrderFormView from './module/order/OrderFormView'
import OrderFormShowView from './module/order/OrderFormShowView'
import OrderAddView from './module/order/OrderAddView'

import { Router, Route, Link, browserHistory,IndexRoute  } from 'react-router'


render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="/hotel/list" component={HotelListView}/>
            <Route path="/hotel/changehotel" component={HotelChangeView}/>  
            <Route path="/hotel/manage" component={HotelMangeView}/>   
            <Route path="/hotel/:id" component={HotelFormView}/>   
            <Route path="/order/daylist" component={OrderListView}/>  
            <Route path="/order/add" component={OrderFormView}/>  
            <Route path="/order/hotel/:id" component={OrderAddView}/>  
            <Route path="/order/:id" component={OrderFormShowView}/> 

            
            
        </Route>
  </Router>,
  document.getElementById('root')
);

