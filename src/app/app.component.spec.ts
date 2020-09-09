import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { WordProviderService } from './services/word-provider.service';

class MockProviderService extends WordProviderService{
  getAWord(){
    return 'NUEVAPALABRA';
  }
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers:[
        {provide: WordProviderService, useClass: MockProviderService}
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'hangman-tdd'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('hangman-tdd');
  });

  it('debe mostrar el mensaje de bienvenida - titulo',() =>{
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.welcome span').textContent).toContain('Bienvenido al HangMan'); 
  });

  it('debe mostrar el progreso de intentoss',()=>{
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;    
    expect(compiled.querySelector('.text-tries').textContent).toContain('Intentos 0 / 9');
  });

  it('debe mostrar botones con las letras desde A a la Z',()=>{
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    let letters= ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    for(var i=0; i< letters.length; i++){
      expect(compiled.querySelector('.letters-buttons').textContent).toContain(letters[i]);
    }
  });

  it('debe tener el mismo número de botones, uno por cada letra', function() {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    let letters= ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var buttons = compiled.querySelectorAll('.letters-buttons button');
    expect(buttons.length).toEqual(letters.length);
  });

  it('debe mostrar  al menos un _ indicando la palabra a encontrar',()=>{
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.hidden-word').textContent).toContain('_');
    
  });

  it('debe tener la seccion donde van las imagenes del ahorcado.',()=>{
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.hangman-img')).not.toBe(null);
    
  });


  it('debe incrementar el número de intentos y mostrar la imagen correspondiente si una letra no esta en la palabra seleccionada',()=>{
    const fixture = TestBed.createComponent(AppComponent);
    var component = fixture.componentInstance;
    component.word = 'ANGULAR';
    component.verify('Z');
    fixture.detectChanges();    
    expect(component.intentos).toBe(1);
    const compiled = fixture.debugElement.nativeElement; 
    expect(compiled.querySelector('.hangman-img').src).toContain('1.png');
  });

  it('debe mostrar la letra en la posición correcta si dicha letra esta en la palabra',()=>{
    const fixture = TestBed.createComponent(AppComponent);
    var component = fixture.componentInstance;
    component.hiddenWord = '_ _ _ _ _ _ _';
    component.word = 'ANGULAR';
    component.verify('A');
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement; 
    expect(compiled.querySelector('.hidden-word').textContent).toContain('A _ _ _ _ A _');

  });


  it('debe mostrar el mensaje HAS PERDIDO y la palbra correcta si supera el número máximo de intentos',()=>{
    const fixture = TestBed.createComponent(AppComponent);
    var component = fixture.componentInstance;
    component.word = 'ANGULAR';
    component.intentos = 8;
    component.hiddenWord = '_ _ _ U L _ R'
    component.verify('M');
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement; 
    expect(compiled.querySelector('.gameover').textContent).toContain('HAS PERDIDO');
    expect(compiled.querySelector('.gameover').textContent).toContain('ANGULAR');
  });

  it('debe mostrar un mensaje de victoria cuando la palabra oculta es igual a la palabra adivinada',()=>{
    const fixture = TestBed.createComponent(AppComponent);
    var component = fixture.componentInstance;
    component.word = 'ANGULAR';
    component.intentos = 8;
    component.hiddenWord = 'A _ G U L A R'
    component.verify('N');
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement; 
    expect(compiled.querySelector('.win').textContent).toContain('¡FELICIDADES HAS GANADO!');
  });

  it('debe ocultar los botones si el jugador gana o pierde',()=>{
    const fixture = TestBed.createComponent(AppComponent);
    var component = fixture.componentInstance;
    component.word = 'ANGULAR';
    component.intentos = 8;
    component.hiddenWord = 'A _ G U L A R'
    component.verify('N');
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement; 
    expect(compiled.querySelector('.letters-buttons')).toEqual(null);
  });

  it('debe mostrar el resultado en caso de usar la palabra devuelta por el MOCK Service',()=>{
    const fixture = TestBed.createComponent(AppComponent);
    var component = fixture.componentInstance;
    component.verify('A');
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement; 
    expect(compiled.querySelector('.hidden-word').textContent).toContain('_ _ _ _ A _ A _ A _ _ A');

  });

  
  it('debe actuar sobre el resultado de spyOn  independiente del servicio',()=>{
    let service = TestBed.inject(WordProviderService);
    let word = 'ELEFANTE'
    spyOn(service, 'getAWord').and.returnValue(word)

    const fixture = TestBed.createComponent(AppComponent);
    var component = fixture.componentInstance;
    component.verify('E');
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement; 
    expect(compiled.querySelector('.hidden-word').textContent).toContain('E _ E _ _ _ _ E');

  });











});
