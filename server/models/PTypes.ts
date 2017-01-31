import * as mongoose from 'mongoose';

let Schema = mongoose.Schema;

export interface IPType extends mongoose.Document{
  acronym: string,
  nickname: string,
  detail: string,
  idealMatches: string,
  kindredSpirits: string,
  compliments: string,
  opposites: string

};

let PTypeSchema = new mongoose.Schema({
  acronym: String,
  nickname: String,
  detail: String,
  idealMatches: String,
  kindredSpirits: String,
  compliments: String,
  opposites: String 
});


export const PType = mongoose.model<IPType>("PType", PTypeSchema);
