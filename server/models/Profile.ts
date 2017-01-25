import * as mongoose from 'mongoose'

let Schema = new mongoose.Schema
export interface IProfile extends mongoose.Document {
  email: { type: String, required:true, unique: true, lowercase: true },
  dob: {type: String, required: true},
  state: { type: String, required: true},
  pType: { type: String, ref: 'PType', required: true},
  picture:string,
  username:String,
  nickname:String,
  detail:String
}
let Profile = new mongoose.Schema({
  email: { type: String, required:true, unique: true, lowercase: true },
  dob: {type: String, required: true},
  state: { type: String, required: true},
  pType: { type: String, ref: 'PType', required: true},
  picture:String,
  username:String,
  nickname:String,
  detail:String
});

export default mongoose.model <IProfile> ('Profile',Profile);
