import Model from '../common/Model'

@Model('Type')
export default class Type {

    constructor(params){
      // super(params)
    }

    async getAll(query){
        console.log('1')
        var data=await this.Model.find(query);
        console.log('1',data)
        return data;
    }
}