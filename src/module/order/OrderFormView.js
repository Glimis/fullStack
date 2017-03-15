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
export default class OrderFormView extends Component{
  constructor(props){
    super(props);

    const order=new Order();
    order.createModel();
    this.model=order.model;
  }  
  change(name,e){
     this.value=e.target.value;
  }
  async click(){
    var data=await this.order.save()
    // this.props.router.push('/order/list')
        
  }
  select(e){
    var id=e.target.value;
    this.order.set('nameid',id);
  }
  render(){
    var self=this;
    return (
            <Form>
                <FormCell>
                    <CellHeader>
                        <Label>名称</Label>
                    </CellHeader>
                    <CellBody>
                        <Input type="text" value={self.model.get('name')}  disabled/>
                    </CellBody>
                </FormCell>
                <FormCell>
                    <CellHeader>
                        <Label>地址</Label>
                    </CellHeader>
                    <CellBody>
                        <Input type="text" value={self.model.get('address')}  disabled/>
                    </CellBody>
                </FormCell>
                <FormCell>
                    <CellHeader>
                        <Label>时间</Label>
                    </CellHeader>
                    <CellBody>
                        <Input type="text" value={time(self.model.get('date'))}  disabled/>
                    </CellBody>
                </FormCell>
              {
                this.model.get('form')&&this.model.get('form').map(function (obj,index) {
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
          )
  }
}

