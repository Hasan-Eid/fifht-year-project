import { TestBed } from '@angular/core/testing';

import { ApolloServiceService } from './apollo-service.service';

describe('ApolloServiceService', () => {
  let service: ApolloServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApolloServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
