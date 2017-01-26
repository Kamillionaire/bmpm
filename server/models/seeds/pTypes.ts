import {PType} from './../PTypes';
namespace main.seeds {
  export class PTypesSeeds {
    public seeds;
    constructor () {
      this.seeds= [
      {acronym:'INTJ', nickname:'The Architect', detail:'Imaginative and strategic thinkers, with a plan for everything.'},
      {acronym:'INTP', nickname:'The Logician', detail:'Innovative inventors with an unquenchable thirst for knowledge.'},
      {acronym:'ENTJ', nickname:'The Comander', detail:'Bold, imaginative and strong-willed leaders, always finding a way – or making one.'},
      {acronym:'ENTP', nickname:'The Debater', detail:'Smart and curious thinkers who cannot resist an intellectual challenge.'},
      {acronym:'INFJ', nickname:'The Advocate', detail:'Quiet and mystical, yet very inspiring and tireless idealists.'},
      {acronym:'INFP', nickname:'The Mediator', detail:'Poetic, kind and altruistic people, always eager to help a good cause.'},
      {acronym:'ENFJ', nickname:'The Protagonist', detail:'Charismatic and inspiring leaders, able to mesmerize their listeners.'},
      {acronym:'ENFP', nickname:'The Campaigner', detail:'Enthusiastic, creative and sociable free spirits, who can always find a reason to smile.'},
      {acronym:'ISTJ', nickname:'The Logistician', detail:'Practical and fact-minded individuals, whose reliability cannot be doubted.'},
      {acronym:'ISFJ', nickname:'The Defender', detail:'Very dedicated and warm protectors, always ready to defend their loved ones.'},
      {acronym:'ESTJ', nickname:'The Executive', detail:'Excellent administrators, unsurpassed at managing things – or people.'},
      {acronym:'ESFJ', nickname:'The Consul', detail:'Extraordinarily caring, social and popular people, always eager to help.'},
      {acronym:'ISTP', nickname:'The Virtuoso', detail:'Bold and practical experimenters, masters of all kinds of tools.'},
      {acronym:'ISFP', nickname:'The Adventurer' , detail:'Flexible and charming artists, always ready to explore and experience something new.'},
      {acronym:'ESTP', nickname:'The Entrepreneur', detail:'Smart, energetic and very perceptive people, who truly enjoy living on the edge.'},
      {acronym:'ESFP', nickname:'The Entertainer', detail:'Spontaneous, energetic and enthusiastic people – life is never boring around them.'}
      ]

    }

    randomHex() {
      return Math.floor(Math.random()*16777215).toString(16);
    }

    createSeeds() {
      this.seeds.forEach((v) => {
        PType.create(v, (e) => {
          if(e) throw new Error(e);

        });
      });
    }
  }
}

export const PTypesSeeds = main.seeds.PTypesSeeds;
