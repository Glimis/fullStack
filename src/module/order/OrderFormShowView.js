import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Order from 'models/Order'
import _ from 'lodash'
import {time} from 'utils'
import { ButtonArea,
    Button,
    CellsTitle,
    CellsTips,
    Cell,
    CellHeader,
    CellBody,
    CellFooter,
    Form,
    FormCell,
    Icon,
    Input,
    Label,
    TextArea,
    Switch,
    Radio,
    Checkbox,
    Select,
    VCode,
    Agreement,
    Toptips
} from 'react-weui';

@observer
export default class OrderFormShowView extends Component{
  constructor(props){
    super(props);
    var id=props.params.id;
    const order=new Order();
    order.createModel();
    this.order=order.model;
    this.order.findById(id);
  }  
  change(name,e){
     this.value=e.target.value;
  }
  async click(){
    this.props.router.push('/order/list')
  }
  select(e){
    var id=e.target.value;
    this.order.set('nameid',id);
  }
  render(){
    var self=this;
    return (
            <div> 
              <CellsTitle>基础信息</CellsTitle>
              <Form>
                  <FormCell>
                      <CellHeader>
                          <Label>名称</Label>
                      </CellHeader>
                      <CellBody>
                          <Input type="text" value={self.order.get('name')}  disabled/>
                      </CellBody>
                  </FormCell>
                  <FormCell>
                      <CellHeader>
                          <Label>地址</Label>
                      </CellHeader>
                      <CellBody>
                          <Input type="text" value={self.order.get('address')}  disabled/>
                      </CellBody>
                  </FormCell>
                  <FormCell>
                      <CellHeader>
                          <Label>时间</Label>
                      </CellHeader>
                      <CellBody>
                          <Input type="text" value={time(self.order.get('date'))}  disabled/>
                      </CellBody>
                  </FormCell>
              </Form>  
              <CellsTitle>订单信息</CellsTitle>
              <Form>
                {
                  this.order.get('form')&&this.order.get('form').map(function (obj,index) {
                    var {name,value}=obj;
                    return (<FormCell key={index}>
                                <CellHeader>
                                    <Label>{name}</Label>
                                </CellHeader>
                                <CellBody>
                                    <Input type="text"  value={value}  disabled/>
                                </CellBody>
                            </FormCell>)
                  })
                }
              </Form> 
            </div>   
          )
  }
}