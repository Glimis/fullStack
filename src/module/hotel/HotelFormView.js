import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { browserHistory } from 'react-router'
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
} from 'react-weui'
import Hotel from 'models/Hotel'
import Type from 'models/Type'

@observer
export default class HotelFormView extends Component{
  constructor(props){
    super(props);
    var id=props.params.id;
    const hotel=new Hotel();
    hotel.createModel();
    this.hotel=hotel.model;
    id&&this.hotel.findById(id);
  
    const type=new Type();
    type.createStore();
    this.type=type.store;
    this.type.all();
  } 
  change(name,e){
    var flag=e.target.checked
    var form=this.hotel.get('form');
    if(flag){
      form.push(name);
    }else{
      form.remove(name);
    }
  }
  changeValue(name,e){
    var value=e.target.value;
    this.hotel.set(name,value);
    if(name=='name'&&value&&value.length>0){
    
    }
  }
  has(name){
    return _.find(this.hotel.get('form'),function(v){return v==name})?true:false;
  }

  //保存
  async save(){
    await this.hotel.saveHotel(); 
    this.props.router.push('/hotel/list')
  }
  render(){
    var self=this;
     return  (
          <div>
            <Form>
                <FormCell>
                    <CellHeader>
                        <Label>名称</Label>
                    </CellHeader>
                    <CellBody>
                        <Input type="text" value={this.hotel.get('name')} onChange={self.changeValue.bind(self,'name')}/>
                    </CellBody>
                </FormCell>
                <FormCell>
                    <CellHeader>
                        <Label>地址</Label>
                    </CellHeader>
                    <CellBody>
                        <Input type="text" value={this.hotel.get('address')} onChange={self.changeValue.bind(self,'address')}  />
                    </CellBody>
                </FormCell>
            </Form>
            <CellsTitle>类别</CellsTitle>
            <Form checkbox>
                 {
                      self.type.getList().map(function (obj,index) {
                        if(self.has(obj.name)){
                          return ( 
                                <FormCell key={index} checkbox>
                                    <CellHeader>
                                        <Checkbox name="checkbox1" onChange={self.change.bind(self,obj.name)} defaultChecked/>
                                    </CellHeader>
                                    <CellBody>{obj.name}</CellBody>
                                </FormCell>)
                        }else{
                            return ( 
                                  <FormCell key={index} checkbox>
                                      <CellHeader>
                                          <Checkbox name="checkbox1" onChange={self.change.bind(self,obj.name)}/>
                                      </CellHeader>
                                      <CellBody>{obj.name}</CellBody>
                                  </FormCell>)
                        }
                      })
                  }
                </Form>
            <ButtonArea>
                <Button
                    onClick={ e=> {
                        this.hotel.save().then(data =>{
                          browserHistory.push(`/hotel/list`)
                        })
                    }
                }>
                    保存
                </Button>
            </ButtonArea>
          </div>
         )  
  }
}