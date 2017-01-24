import * as mongoose from 'mongoose'

let Schema = new mongoose.Schema
export interface IProfile extends mongoose.Document {

  picture:string;
}
let ProfileSchema = new mongoose.Schema({

  picture:String
});

export default mongoose.model <IProfile> ('ProfileSchema',ProfileSchema);
