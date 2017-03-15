import express from 'express';
import fs from 'fs'
import path from 'path'
const modelDir =path.join(__dirname,'../model');
import {db} from '../config'
import mongoose from 'mongoose'
mongoose.connect(db.uri, db.opts);

export default function(app){
    global.M={};
     //注入所有模型
    fs.readdirSync(modelDir).forEach(function (name) {
      name=name.slice(0,name.length-3);
      name=name.toLowerCase();
      console.log('name',name,path.join(modelDir, name))
      if(name!='index'&&name!='default'){
        var model=require(path.join(modelDir, name)).default;
        app.use("/"+name, new model().toRouter());
      }
    })
}
