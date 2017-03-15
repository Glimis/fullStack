import {Schema} from 'mongoose'

var obj = {
    name: String
};

export default class Type extends Schema{

    constructor() {
        super(obj);
    }

};

