import * as mongoose from 'mongoose';

let Schema = mongoose.Schema;

export interface IPType extends mongoose.Document{
  acronym: string,
  nickname: string,
  detail: string,
};

let PTypeSchema = new mongoose.Schema({
  acronym: String,
  nickname: String,
  detail: String,
});


export const PType = mongoose.model<IPType>("PType", PTypeSchema);
