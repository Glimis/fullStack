import Model from './Model'
import Store from './Store'


export default class Schema{

    constructor(params){
      this.name=this.constructor.name.toLocaleLowerCase(),
      this.params=params;
    }

    createModel(){
      this.model=new Model(this.params,this.name); 
      return this.model;
    }

    createStore(){
      this.store=new Store(this.params,this.name); 
      return this.store;
    }

    static createModel(){
      var model=new this()
      return model.createModel();
    }
    static createStore(){
      var model=new this()
      return model.createStore();
    }
}