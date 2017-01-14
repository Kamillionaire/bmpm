import * as mongoose from 'mongoose';

let Schema = mongoose.Schema;

export interface IPTypes extends mongoose.Document{
  type: string,
  name: string,
  detail: string,
};

let PTypeSchema = new Schema({
  type: String,
  name: String,
  detail: String,
});


export const PType = mongoose.model<IPType>('Movie', PTypeSchema);
