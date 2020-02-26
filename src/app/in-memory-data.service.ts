import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Friend } from './friend';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const friends = [
      { id: 1,
        name: 'Elle Brookes',
        age: 20,
        description: "I am a 20 year English major at George Mason, who enjoys classic literature and writing in my free time.",
        interests: ['Baking', 'Reading', 'Cooking'],
        img: '../assets/images/female.jpg'
      },
      { id: 2,
        name: 'Lani Greenes',
        age: 21,
        description: "I am a foreign exchange student studying Business, who enjoys jamming to music and reading movie analyses.",
        interests: ['Baking', 'Reading', 'Music'],
        img: '../assets/images/female.jpg'
      },
      { id: 3,
        name: 'David James',
        age: 30,
        description: "I’d rather be hated for who I am than loved for who I am not.",
        interests: ['Volleyball', 'Skiing'],
        img: '../assets/images/male.jpg'
      },
      { id: 4,
        name: 'Ben Jones',
        age: 22,
        description: "A man of mystery and power, whose power is exceeded only by his mystery..",
        interests: ['Skiing', 'Zip lining'],
        img: '../assets/images/male.jpg'
      }
    ];
    return {friends};
  }

  // Overrides the genId method to ensure that a friend always has an id.
  // If the friends array is empty,
  // the method below returns the initial number (11).
  // if the friends array is not empty, the method below returns the highest
  // friend id + 1.
  genId(friends: Friend[]): number {
    return friends.length > 0 ? Math.max(...friends.map(friend => friend.id)) + 1 : 1;
  }
}