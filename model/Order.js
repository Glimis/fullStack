import {Schema} from 'mongoose'

var type=new Schema({
   name:String,
   value:String
});

var obj = {
   name: String,
   address: String,
   date: { type: Date, default: Date.now },
   form: [type]
};


export default class Order extends Schema{

    constructor() {
        super(obj);
    }

};