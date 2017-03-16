import express from 'express';
import fs from 'fs'
import path from 'path'
const modelDir =path.join(__dirname,'../model');
import {db} from '../config'
import mongoose from 'mongoose'
mongoose.connect(db.uri, db.opts);


import Type from '../model/Type'
export default function(app){
   
     //注入所有模型
    fs.readdirSync(modelDir).forEach(function (name) {
      name=name.slice(0,name.length-3);
      name=name.toLowerCase();
      if(name!='index'&&name!='default'){
        console.log('name',name)
        if(name=='type') return;
        var model=require(path.join(modelDir, name)).default;
        app.use("/"+name, new model().toRouter());
      }
    })

    app.use("/type",Type)
}
