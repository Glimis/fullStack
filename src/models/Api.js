import {Post,Get} from './Ajax'
import { observable, asMap, action, ObservableMap } from 'mobx'
/**
 *  参考http://mongoosejs.com/docs/api.html 设置api
 */
export default {
    async findById(id){
        return this.emit('getById',{
            id:id
        })
    },
    async save(){
        return this.emit('save',this.get())
    },
    //自定义--》读取controller
    async Get (url,params){
        var basepath=this.basepath;
        var data = await Get(basepath+url,params);
        this.set(data)
        return data;
    },
    async Post (url,params){
        var basepath=this.basepath;
        var data = await Post(basepath+url,params);
        this.set(data)
        return data;
    },
    async emit(name,params){
        var basepath=this.basepath;
        var data;
        if(getMethod(name)=="get"){
            data = await Get(basepath+"/"+name,params);
        }else{
            data = await Post(basepath+"/"+name,params);
        }
        this.set(data)
        return data; 
    }
}


function getMethod(name){
  var method='get';
  if(name.indexOf('get')!=0){
    method='post';
  }
  return method;
}



