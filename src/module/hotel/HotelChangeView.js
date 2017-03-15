import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { browserHistory } from 'react-router'
import ChangeHotel from 'Component/ChangeHotel'


@observer
export default class HotelListView extends Component{
  constructor(props){
    super(props);
  }  
  gotoEdit(id){
    browserHistory.push(`/order/hotel/`+id)
  }
  async initData(){
    this.hotels.emit('getNoList')
  }

  render(){
    var self=this;
    return (
          <div className='container'>
              <ChangeHotel bodyClick={self.gotoEdit} initData={self.initData}></ChangeHotel>   
          </div>)
  }
}