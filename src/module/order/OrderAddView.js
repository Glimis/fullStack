import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Order from 'models/Order'
import Hotel from 'models/Hotel'
import _ from 'lodash'
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
import { browserHistory } from 'react-router'
@observer
export default class OrderAddView extends Component{
  constructor(props){
    super(props);
    var self=this;
    var id=props.params.id; 
    this.order=Order.createModel();
    this.hotel=Hotel.createModel();

    this.hotel.findById(id).then(function(data){
      self.order.set('name',data.name);
      self.order.set('address',data.address);
      self.order.set('date',undefined);
    });
  }  
  change(name,e){
    var form=this.order.get('form');
    var value=e.target.value;
    
    var obj=form.find(function(v){
      return v.name==name;
    })
    
    obj&&form.remove(obj);
    form.push({
      name:name,
      value:value
    });

    this.order.set('form',form)
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
            </Form>   
            <CellsTitle>订单信息</CellsTitle>
            <Form>
              {
                this.hotel.get('form')&&this.hotel.get('form').map(function (obj,index) {
                  return (<FormCell key={index}>
                              <CellHeader>
                                  <Label>{obj}</Label>
                              </CellHeader>
                              <CellBody>
                                  <Input type="text" onChange={ self.change.bind(self,obj) } />
                              </CellBody>
                          </FormCell>)
                })
              }
            </Form> 
            <ButtonArea>
                <Button
                    onClick={ e=> {
                        this.order.save().then(data =>{
                          browserHistory.push(`/order/`+data._id)
                        })
                    }
                }>
                    提交
                </Button>
            </ButtonArea>
          </div>  
          )
  }
}