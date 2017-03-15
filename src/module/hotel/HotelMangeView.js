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
    //总部宾馆
    var self=this;
    this.allhotel=Hotel.createStore();
    this.hotel=Hotel.createStore();

    var initData=_.after(2,function(){
        var all=self.allhotel.getList(),
            dt=self.hotel.getList();
        var has=_.intersectionBy(all,dt,'name');
        self.hotel.set(has);
    })
    this.allhotel.Get('/getHotels').then(function(data){
      initData();
    })
    this.hotel.all().then(function(data){
      initData();
    })
  } 
  selectHotel(obj,e){
    debugger
    this.hotel.remove(obj);
    // if(e.target.checked){
    //   this.hotel.push(obj);
    // }else{
    //   this.hotel.remove(obj);
    // }
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
    return _.find(this.hotel.getList(),function(v){return v.name==name})?true:false;
  }

  //保存
  async save(){
    await this.hotel.save(); 
    this.props.router.push('/hotel/list')
  }

  render(){
    var self=this;
     return  (
          <div>
            <CellsTitle>同步信息</CellsTitle>
            <Form checkbox>
                 {
                      self.allhotel.getList().map(function (obj,index) {
                          var checkedBox=self.has(obj.name)?(<Checkbox onChange={self.selectHotel.bind(self,obj)} name="checkbox1" defaultChecked/>):(<Checkbox onChange={self.selectHotel.bind(self,obj)} name="checkbox1" />);
                          return ( 
                                <FormCell key={index} checkbox>
                                    <CellHeader>
                                        {checkedBox}
                                    </CellHeader>
                                    <CellBody>{obj.name}</CellBody>
                                </FormCell>)
                      })
                  }
            </Form>
            <CellsTitle>选中宾馆</CellsTitle>
            <Form checkbox>
                 {
                      self.hotel.getList().map(function (obj,index) {
                          
                          return ( 
                                <FormCell key={index} checkbox>
                                    <CellHeader>
                                       &nbsp;
                                    </CellHeader>
                                    <CellBody>{obj.name}</CellBody>
                                </FormCell>)
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