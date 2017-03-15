export {Get,Post} from '../models/Ajax'
export function time(dateString){
    var date=new Date(dateString);
    return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate() +"  "+ date.getHours()  + ":"+ date.getMinutes() +":"+ date.getSeconds()
}
