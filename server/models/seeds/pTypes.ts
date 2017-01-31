import {PType} from './../PTypes';
namespace main.seeds {
  export class PTypesSeeds {
    public seeds;
    constructor () {
      this.seeds= [
      {acronym:'INTJ', nickname:'The Architect', detail:'Imaginative and strategic thinkers, with a plan for everything.',
      idealMatches:'ISTJ, INTP, ENTJ', kindredSpirits:'INFP, INFJ, ENTP, ENFJ', compliments:'ISTP, ESTP, ESTJ, ENFP', opposites:'ISFP, ISFJ, ESFP, ESFJ'},
      {acronym:'INTP', nickname:'The Logician', detail:'Innovative inventors with an unquenchable thirst for knowledge.',
      idealMatches:'INTJ, INFP, ENTP', kindredSpirits:'ISTP, INFJ, ENTJ, ENFP', compliments:'ISTJ, ISFP, ESTP, ENFJ', opposites:'ESTJ, ISFJ, ESFP, ESFJ'},
      {acronym:'ENTJ', nickname:'The Comander', detail:'Bold, imaginative and strong-willed leaders, always finding a way – or making one.',
      idealMatches:'INTJ, ESTJ, ENTP', kindredSpirits:'ISTJ, INTP, ENFP, ENFJ', compliments:'ISTP, INFJ, ESTP, ESFJ', opposites:'ISFP, ISFJ, INFP, ESFP'},
      {acronym:'ENTP', nickname:'The Debater', detail:'Smart and curious thinkers who cannot resist an intellectual challenge.',
      idealMatches:'INTP, ENTJ, ENFP', kindredSpirits:'INTJ, INFP, ESTP, ENFJ', compliments:'ISTP, INFJ, ESTJ, ESFP', opposites:'ISTJ, ISFP, ISFJ, ESFJ'},
      {acronym:'INFJ', nickname:'The Advocate', detail:'Quiet and mystical, yet very inspiring and tireless idealists.',
      idealMatches:'ISFJ, INFP, ENFJ', kindredSpirits:'ISFP, INTP, INTJ, ENFP', compliments:'ISTJ, ENTP, ESFJ, ENTJ', opposites:'ISTP, ESTP, ESTJ, ESFP'},
      {acronym:'INFP', nickname:'The Mediator', detail:'Poetic, kind and altruistic people, always eager to help a good cause.',
      idealMatches:'INTP, INFJ, ENFP', kindredSpirits:'ISFP, INTJ, ENTP, ENFJ', compliments:'ISTP, IDFJ, ESFP, ENTJ', opposites:'ISTJ, ESTP, ESTJ, ESFJ'},
      {acronym:'ENFJ', nickname:'The Protagonist', detail:'Charismatic and inspiring leaders, able to mesmerize their listeners.',
      idealMatches:'INFJ, ESFJ, ENFP', kindredSpirits:'INTJ, INFP, ENTP, ENTJ', compliments:'ISFJ, INTP, ESTJ, ESFP', opposites:'ISTP, ISTJ, ISFP, ESTP'},
      {acronym:'ENFP', nickname:'The Campaigner', detail:'Enthusiastic, creative and sociable free spirits, who can always find a reason to smile.',
      idealMatches:'INFP, ENTP, ENFJ', kindredSpirits:'INFJ, INTP, ESFP, ENTJ', compliments:'ISFP, INTJ, ESTP, ESFJ', opposites:'ISTP, ISTJ, ISFJ, ESTJ'},
      {acronym:'ISTJ', nickname:'The Logistician', detail:'Practical and fact-minded individuals, whose reliability cannot be doubted.',
      idealMatches:'ISTP, ISFJ, ESTJ', kindredSpirits:'INTJ, ESTP, ESFJ, ENTJ', compliments:'ISFP, INTP, INFJ, ESFP', opposites:'ENTP, ENFP, INFP, ENFJ'},
      {acronym:'ISFJ', nickname:'The Defender', detail:'Very dedicated and warm protectors, always ready to defend their loved ones.',
      idealMatches:'ISTJ, ESFJ, INFJ', kindredSpirits:'ISFP, ESTJ, ESFP, ENFJ', compliments:'ISTP, INFP, ESTP, ENFP', opposites:'INTP, INTJ, ENTP, ENTJ'},
      {acronym:'ESTJ', nickname:'The Executive', detail:'Excellent administrators, unsurpassed at managing things – or people.',
      idealMatches:'ISTJ, ESTP, ENTJ', kindredSpirits:'ISTP, INTJ, ESFP, ESFJ', compliments:'ENFJ, INFJ, ENTP, ISFJ', opposites:'ISFP, INTP, INFP, ENFP'},
      {acronym:'ESFJ', nickname:'The Consul', detail:'Extraordinarily caring, social and popular people, always eager to help.',
      idealMatches:'ISFJ, ESTJ, ESFP', kindredSpirits:'ISTJ, ISFP, ESTP, ENFJ', compliments:'ISTP, INFJ, ENTJ, ENFP', opposites:'INTJ, INTP, INFP, ENTP'},
      {acronym:'ISTP', nickname:'The Virtuoso', detail:'Bold and practical experimenters, masters of all kinds of tools.',
      idealMatches:'ISTJ, ISFP, ESTP', kindredSpirits:'ISFJ, INTP, ESTJ, ESFP', compliments:'INTJ, ESFJ, ENTP, ENTJ', opposites:'INFJ, ENFJ, INFP, ENFP'},
      {acronym:'ISFP', nickname:'The Adventurer' , detail:'Flexible and charming artists, always ready to explore and experience something new.',
      idealMatches:'ISTP, ISFJ, ESFP', kindredSpirits:'INFP, ESFJ, ESTP, ENFP', compliments:'ISTJ, INTP, INFJ, ENFJ', opposites:'INTJ, ESTJ, ENTJ, ENTP'},
      {acronym:'ESTP', nickname:'The Entrepreneur', detail:'Smart, energetic and very perceptive people, who truly enjoy living on the edge.',
      idealMatches:'ISTP, ESTJ, ENTP', kindredSpirits:'ISTJ, ESFP, ENTJ, ENFP', compliments:'ISFP, INTJ, ESFJ, ENFJ', opposites:'ISFJ, INTP, INFP, INFJ'},
      {acronym:'ESFP', nickname:'The Entertainer', detail:'Spontaneous, energetic and enthusiastic people – life is never boring around them.',
      idealMatches:'ISFP, ESTP, ESFJ', kindredSpirits:'ISTP, ISFJ, ENFP, ENFJ', compliments:'ISTJ, INFP, ESTJ, ENTP', opposites:'INTJ, INTP, INFJ, ENTJ'}
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
