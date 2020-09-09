import { Component } from '@angular/core';
import {WordProviderService } from './services/word-provider.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'hangman-tdd';
  intentos= 0;
  letters= ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  
  word= 'AGUACATE';
  hiddenWord= '';
  win = false;
  lost = false;


  constructor(private wordProviderService: WordProviderService) {
    this.word = this.wordProviderService.getAWord();
    this.hiddenWord = '_ '.repeat( this.word.length );
  }

  verify( letter ) {
    this.letterExists(letter);
    const hiddenWordArr = this.hiddenWord.split(' ');
    for (let i = 0; i < this.word.length; i++) {
      if ( this.word[i] === letter) {
        hiddenWordArr[i] = letter;
      }
      this.hiddenWord = hiddenWordArr.join(' ');
    }
    this.verifyWin();
   }


   verifyWin() {
    const wordArr = this.hiddenWord.split(' ');
    const wordEvaluate= wordArr.join('');
    if ( wordEvaluate=== this.word ) {
      this.win = true;
    }
    if ( this.intentos >= 9 ){
      this.lost = true;
    }
  }


  letterExists( letter ) {
    if ( this.word.indexOf( letter ) >= 0) {
      console.log('La letra ' + letter + ' existe');
    } else {
      console.log('La letra ' + letter + ' no existe');
      this.intentos++;
    }
  }



}
