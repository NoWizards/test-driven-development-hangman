import { TestBed } from '@angular/core/testing';

import { WordProviderService } from './word-provider.service';

describe('WordProviderService', () => {
  let service: WordProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
