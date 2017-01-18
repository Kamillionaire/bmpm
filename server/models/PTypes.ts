import * as mongoose from 'mongoose';

let Schema = mongoose.Schema;

export interface IPType extends mongoose.Document{
  type: string,
  name: string,
  detail: string,
};

let PTypeSchema = new mongoose.Schema({
  type: String,
  name: String,
  detail: String,
});


export default mongoose.model<IPType>("PType", PTypeSchema);
