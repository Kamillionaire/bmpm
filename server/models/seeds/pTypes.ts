import {PType} from './../PTypes';
namespace main.seeds {
  export class PTypesSeeds {
    public seeds;
    constructor () {
      this.seeds= [
      {ptype:'INTJ', nickname:'Architect', detail:'Imaginative and strategic thinkers, with a plan for everything.'},
      {ptype:'INTP', nickname:'Logician', detail:'Innovative inventors with an unquenchable thirst for knowledge.'},
      {ptype:'ENTJ', nickname:'Comander', detail:'Bold, imaginative and strong-willed leaders, always finding a way – or making one.'},
      {ptype:'ENTP', nickname:'Debater', detail:'Smart and curious thinkers who cannot resist an intellectual challenge.'},
      {ptype:'INFJ', nickname:'Advocate', detail:'Quiet and mystical, yet very inspiring and tireless idealists.'},
      {ptype:'INFP', nickname:'Mediator', detail:'Poetic, kind and altruistic people, always eager to help a good cause.'},
      {ptype:'ENFJ', nickname:'Protagonist', detail:'Charismatic and inspiring leaders, able to mesmerize their listeners.'},
      {ptype:'ENFP', nickname:'Campaigner', detail:'Enthusiastic, creative and sociable free spirits, who can always find a reason to smile.'},
      {ptype:'ISTJ', nickname:'Logistician', detail:'Practical and fact-minded individuals, whose reliability cannot be doubted.'},
      {ptype:'ISFJ', nickname:'Defender', detail:'Very dedicated and warm protectors, always ready to defend their loved ones.'},
      {ptype:'ESTJ', nickname:'Executive', detail:'Excellent administrators, unsurpassed at managing things – or people.'},
      {ptype:'ESFJ', nickname:'Consul', detail:'Extraordinarily caring, social and popular people, always eager to help.'},
      {ptype:'ISTP', nickname:'Virtuoso', detail:'Bold and practical experimenters, masters of all kinds of tools.'},
      {ptype:'ISFP', nickname:'Adventurer' , detail:'Flexible and charming artists, always ready to explore and experience something new.'},
      {ptype:'ESTP', nickname:'Entrepreneur', detail:'Smart, energetic and very perceptive people, who truly enjoy living on the edge.'},
      {ptype:'ESFP', nickname:'Entertainer', detail:'Spontaneous, energetic and enthusiastic people – life is never boring around them.'}
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
