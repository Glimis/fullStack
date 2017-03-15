import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Type from 'models/Type';
import {Form,FormCell,CellHeader,CellBody,Label,Input,ButtonArea,Button} from 'react-weui';


@observer
export default class TypeList extends Component{
  constructor(props){
    super(props);
    if(props.initModel){
      this.initModel=props.initModel;
    }
    if(props.getList){
      this.getList=props.getList;
    }
    this.submit=props.submit;
    this.initModel();
  }  

  initModel(){
    var types=new Type();
    types.createStore();
    this.store=types.store;
    this.store.all();
  }

  bodyClick(id){
    
  }

  //模型,name
  getList(){
    return this.store.getList();
  }

  hasButton(){
    if(this.submit){
      var text=this.submitText?this.submitText:'新增';
      return (
            <ButtonArea>
                <Button
                    onClick={this.submit}>
                    {text}
                </Button>
            </ButtonArea>   
        )
    }
  }

  render(){
    var self=this;
    return (
          <div className='container'>
            <Form>
              {
                this.getList().map(function (obj,index) {
                      return (
                            <FormCell key={index} onClick={self.bodyClick.bind(self,obj._id)}>
                                <CellHeader>
                                  <Label>&nbsp;</Label>
                                </CellHeader>
                                <CellBody>
                                    <Input type="text" disabled value={obj.name}/>
                                </CellBody>
                            </FormCell> )
                })
              }  
            </Form>   
            {this.hasButton()} 
          </div>)
  }
}