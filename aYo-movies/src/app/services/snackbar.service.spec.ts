import { TestBed } from '@angular/core/testing';

import { SnackbarService } from './snackbar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarTypeEnum } from '../enums/snackbar-type.enum';

class MockServiceDependencyStub {
  open(){}
}

describe('SnackbarService', () => {
  let service: SnackbarService;
  // let mockValidator: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SnackbarService, { provide: MatSnackBar, useClass: MockServiceDependencyStub }]
    });
    service = TestBed.inject(SnackbarService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show a snackbar', () => {
    service.showSnackBar("Snackbar works", SnackbarTypeEnum.success, 5000);
  });

});
