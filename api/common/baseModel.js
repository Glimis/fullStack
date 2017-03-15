import express from 'express';
import _ from 'lodash'
import mongoose from 'mongoose'
const modelsDir =path.join(__dirname,'../../model');
import path from 'path'

function filterByStatus(status,v){
  return v.status==status
}

export default class BaseModel {

    constructor(){
      var name=this.constructor.name;
      name=name.toLowerCase();
      var model=require(path.join(modelsDir, name)).default;
      this.Model=M[name] = mongoose.model(name, new model());
    }

    //获取全部内容
    async getAll(query){
        var data=await this.Model.find(query);
    
        return _.map(data,function(v){
          var doc=v._doc;
          doc.rowStatus="unchange";
          return doc
        });
    }

    //通过id获取信息
    async getById(query){
      var id=query.id;
      var data=await this.Model.findById(id);
      return data;
    }

    //saveOrUpdate
    async save(query){
      var data;
      if(query._id){
        data=await this.Model.update({_id:query._id},query);
      }else{
        data=await this.Model.create(query);
        console.log('data',data)
      }
      return data;
    }


    async saveAll(dataSet){
      var Model=this.Model,data;
      var delData=_.filter(dataSet,_.partial(filterByStatus,'del'))
      if(delData.length>0){
        //根据id,进行删除
        Model.remove(_.map(delData,function(v){
          return {
            _id:v._id
          }
        }))
      }

      var updData=_.filter(dataSet,_.partial(filterByStatus,'upd'))
      
      if(updData.length>0){
        _.each(updData,function(v){
          Model.update({_id:v._id},v)
        })
      }
      
      var newData=_.filter(dataSet,_.partial(filterByStatus,'new'))
      if(newData.length>0){
        data=await Model.create(newData)
      }
      return data;
    }

    toRouter(){
      var self=this;
      var router=express.Router();
      //获取原型
      var obj=Object.getPrototypeOf(self);
      //获取所有方法
      //qiantao嵌套获取
      var fns=getOwnPropertyNames(obj);
    
      //所有的controller系列函数
      var controllerFn=fns.filter(filterFunction)

      _.each(controllerFn,function(name){
        router[getMethod(name)]("/"+name,function(req,res,next){
          rsJson(self[name].bind(self),req,res,next);
        });
      })

      return router;
    }
}


function getOwnPropertyNames(self){
  var fns=[]
  if(self&&self.constructor!=Object){
    //获取所有方法
    fns=Object.getOwnPropertyNames(self);
    //获取原型
    var obj=Object.getPrototypeOf(self);
    fns=fns.concat(getOwnPropertyNames(obj));
  }
  return fns;
}

//去除不需要的函数
function filterFunction(v){
  return v!="constructor"&&v!='toRouter'&&v!='constructor'
}

//根据名称,决定router的method
function getMethod(name){
  var method='get';
  if(name.indexOf('get')!=0){
    method='post';
  }
  return method;
}



/**
 * res为事件的处理方式,res.json并没有return的效果
 * 大多数短链接请求,只包含一个res.json
 * 使用该函数,return json后以直接返回结果
 */
async function  rsJson(fn,req,res,next){
  var json={};
  try{
    //严格模式下的参数,最多只会存在一个,无视来源
    var query=_.extend(req.body,req.query)||{};
    json=await fn(query,req.params);
  }catch(e){
    json={
      status:0,
      msg:e.message
    }
  }
  res.json(json);
}

