import _ from 'lodash'
import BaseModel from '../common/baseModel'

export default class Hotel extends BaseModel{

  constructor(params){
    super(params)
  }

  async getById(query){
      var id=query.id;
      var data=await this.Model.findById(id);
      if(data.status==undefined){
        data.status=1;
      }
      return data;
    }
  /**
   * 获取今日数据
   */
  async getDayList(){
     var Model=M.order;
     var dt=new Date()
     var from=dt.getFullYear()+"-"+(dt.getMonth()+1)+ "-"+dt.getDate()
     var to=dt.getFullYear()+"-"+(dt.getMonth()+1)+ "-"+(dt.getDate()+1)
     var data=await Model.find({
        date:{
          "$gte": new Date(from),
          "$lt":new Date(to)
        }
     })
     var alldata=await M.hotel.find({});
    // return _.intersectionBy(alldata,data,'name');
    var rs=data.map(function(v){
      var r=_.pick(v,['name','_id','form','date','address']);
      var dt=alldata.find(function(_v){
        return v.name==_v.name;
      });
      r.letter=dt.letter;
      return r
    })
     return rs;
  }

  /**
   * 获取今日未完成宾馆
   */
  async getNoList(query){
     var Model=M.order;
     var dt=new Date()
     var from=dt.getFullYear()+"-"+(dt.getMonth()+1)+ "-"+dt.getDate()
     var to=dt.getFullYear()+"-"+(dt.getMonth()+1)+ "-"+(dt.getDate()+1)
     var data=await Model.find({
        date:{
          "$gte": new Date(from),
          "$lt":new Date(to)
        }
     })
      var alldata=await M.hotel.find({});
      //根据名字删除
      return _.differenceBy(alldata,data,'name');
  }
}