import {PType} from '../PTypes';

const seeds = [
{type:'INTJ', name:'Architect', detail:'Imaginative and strategic thinkers, with a plan for everything.'},
{type:'INTP', name:'Logician', detail:'Innovative inventors with an unquenchable thirst for knowledge.'},
{type:'ENTJ', name:'Comander', detail:'Bold, imaginative and strong-willed leaders, always finding a way – or making one.'},
{type:'ENTP', name:'Debater', detail:'Smart and curious thinkers who cannot resist an intellectual challenge.'},
{type:'INFJ', name:'Advocate', detail:'Quiet and mystical, yet very inspiring and tireless idealists.'},
{type:'INFP', name:'Mediator', detail:'Poetic, kind and altruistic people, always eager to help a good cause.'},
{type:'ENFJ', name:'Protagonist', detail:'Charismatic and inspiring leaders, able to mesmerize their listeners.'},
{type:'ENFP', name:'Campaigner', detail:'Enthusiastic, creative and sociable free spirits, who can always find a reason to smile.'},
{type:'ISTJ', name:'Logistician', detail:'Practical and fact-minded individuals, whose reliability cannot be doubted.'},
{type:'ISFJ', name:'Defender', detail:'Very dedicated and warm protectors, always ready to defend their loved ones.'},
{type:'ESTJ', name:'Executive', detail:'Excellent administrators, unsurpassed at managing things – or people.'},
{type:'ESFJ', name:'Consul', detail:'Extraordinarily caring, social and popular people, always eager to help.'},
{type:'ISTP', name:'Virtuoso', detail:'Bold and practical experimenters, masters of all kinds of tools.'},
{type:'ISFP', name:'Adventurer' , detail:'Flexible and charming artists, always ready to explore and experience something new.'},
{type:'ESTP', name:'Entrepreneur', detail:'Smart, energetic and very perceptive people, who truly enjoy living on the edge.'},
{type:'ESFP', name:'Entertainer', detail:'Spontaneous, energetic and enthusiastic people – life is never boring around them.'}
]

seeds.map((seed) => {
  PType.create(seed, (e, data) => {
    if(e) throw new Error(e);
    console.log(`Created ${data.type} in the ${PType.modelName} collection as ${data._id}`);
  });
});