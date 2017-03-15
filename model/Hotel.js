import {Schema} from 'mongoose'

var obj={
   name:String,
   xian:String,
   xiang:String,
   address:String,
   letter:String,
   form:[String]
}


export default class Hotel extends Schema{

    constructor() {
        super(obj);
    }

};