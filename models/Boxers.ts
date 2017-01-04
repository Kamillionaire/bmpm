import * as mongoose from 'mongoose';

let Schema = mongoose.Schema;

export interface IBoxer extends mongoose.Document {
  name: string,
  age: number,
  weight: number
}

let BoxerSchema = new Schema({
  name: String,
  age: Number,
  weight: Number
});

export default mongoose.model<IBoxer>('Boxer', BoxerSchema);
