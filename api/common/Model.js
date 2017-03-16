import path from 'path'
const modelsDir =path.join(__dirname,'../../model');
import mongoose from 'mongoose'
import express from 'express'
import _ from 'lodash'
export default function(modelName){
     modelName=modelName.toLowerCase();
     
    global.M=global.M||{};

     return function(Model){
        var _m=new Model();
        var model=require(path.join(modelsDir,modelName)).default;
        // global.M[modelName] = mongoose.model(modelName, new model());
        // global.app.use("/"+name, new model().toRouter());
        // 
        
        return  toRouter.call(_m);
     }
}

function toRouter(){
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
        console.log('111',name,getMethod(name),self[name],self)
        router[getMethod(name)]("/"+name,function(req,res,next){
            console.log('xxxxxxxxx')
          rsJson(self[name].bind(self),req,res,next);
        });
      })
      return router;
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
  console.log('fn',fn)
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

