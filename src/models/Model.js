import { observable, action, ObservableMap } from 'mobx'
import Store from './Store'
import type { Uuid, Error, Request, Id, Label, DestroyOptions, SaveOptions } from './types'
import api from './Api'
import _ from 'lodash'


function initValue(type){
  if(type.name=="String"){
    return "";
  }else if(_.isArray(type)){
    var v=initValue(type[0]);
    return [];
  }else if(_.isObject(type)){
    if(type.default){
      return type.default();
    }
    return _.mapValues(type,function(v){
      return initValue(v);
    });
  }else {

    return "";
  }

}

export default  class Model {
  //请求状态
  @observable request: ?Request = null
  //错误信息
  @observable error: ?Error = null

  //属性集合
  attributes: ObservableMap

  constructor (attributes: {},modelName) {
    this.attributes = observable.map(attributes);
    //模型名称
    
    this.basepath='/api/'+modelName;
    //合并api
    Object.assign(this,api);

    //初始化属性
    var data=_.mapValues(attributes,function(v,k){
      return initValue(v);
    })

    
    this.set(data)
  }





  //设置内容
  @action set (name,value): void {
    
    if(typeof name=='object'){

      this.attributes.merge(name)
    }else{
      this.attributes.set(name,value)
    }
  }

  //获取内容
  get (attribute: string): ?any {
    if(attribute){
      return this.attributes.get(attribute)
    }else{
      return toJSON(this.attributes)
    }
  }


}



function toJSON(obj){
  var json=obj.toJSON();
  if(_.isArray(json)){
    return json
  }
  return _.mapValues(json,function(v,k){
    if(!v||_.isString(v)){
      return v;
    }
    if(v.constructor.name=="ObservableArray"){

      return toJSON(v);
    }else{
      return v;
    }
  })
}
