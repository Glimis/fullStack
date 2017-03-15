import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {  Link } from 'react-router'
import Hotel from 'models/Hotel'
import {Form,FormCell,CellHeader,CellBody,Label,Input,ButtonArea,Button} from 'react-weui'



@observer
export default class ChangeHotel extends Component{
  constructor(props){
    super(props);

    if(props.initData){
      this.initData=props.initData;
    }
    if(props.bodyClick){
      this.bodyClick=props.bodyClick;
    }
    if(props.addClick){
      this.addClick=props.addClick;
    }
    if(props.initModel){
      this.initModel=props.initModel;
    }
    this.initModel();
    this.initData();
  }  
  initModel(){
    var hotels=new Hotel();
    hotels.createStore();
    this.hotels=hotels.store;
  }
  initData(){
    this.hotels.all();
  }
  bodyClick(id){
   
  }
  getList(){
    var list=_.map(this.hotels.getList(),function(v){
      if(v.letter){
        v.letter=v.letter[0]
      }
      return v;
    })
    return _.groupBy(_.orderBy(this.hotels.getList(),'letter'),'letter')
  }
  render(){
    var self=this;
    var button=this.hasButton();
    return (
          <div className='container'>
            <Form>
              {
                _.map(self.getList(),function(data,key){
                  return  (data.map(function (obj,index) {
                    if(index==0){
                      return (
                            <FormCell key={index} onClick={self.bodyClick.bind(self,obj._id)}>
                                <CellHeader>
                                   <Label>{key}</Label>
                                </CellHeader>
                                <CellBody>
                                    <Input type="text" disabled value={obj.name}/>
                                </CellBody>
                            </FormCell> )
                    }else{
                      return (
                            <FormCell key={index} onClick={self.bodyClick.bind(self,obj._id)}>
                                <CellHeader>
                                  <Label>&nbsp;</Label>
                                </CellHeader>
                                <CellBody>
                                    <Input type="text" disabled value={obj.name}/>
                                </CellBody>
                            </FormCell> )
                    }
                    }))
                })
              }  
            </Form>   
            {button}
          </div>)
  }

  hasButton(){
    if(this.addClick){
      return (
            <ButtonArea>
                <Button
                    onClick={this.addClick}>
                    新增
                </Button>
            </ButtonArea>
        )
    }
  }
}