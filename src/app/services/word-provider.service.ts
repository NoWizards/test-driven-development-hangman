import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IWord } from '../models/iData';

@Injectable({
  providedIn: 'root'
})
export class WordProviderService {
  private url = 'http://nuestro-hangman.com/servicios/palabras';
  private words = [];
  pos =0;



  constructor() { }

  getAWord() {  
    fetch(this.url)
      .then(wordsResponse => {
        return wordsResponse.json();
      })
      .then(words => {
        return words.map((x: IWord) => x.word)
      }).then(r =>{
        this.words = r;
        this.pos = Math.floor(Math.random() * Math.floor(this.words.length));

      })
      .catch(err => {
        console.log(err);
      });
      return this.words[this.pos];
  }

}
