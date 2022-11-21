import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { CommonModule } from '@angular/common';
import { ErrorsModule } from '../errors/errors.module';
import { MaterialModule } from '../material.module';
import { AuthService } from '../../core/services/auth.service';
import { User, userFactory } from '../../core/models/user.model.';
import { BehaviorSubject } from 'rxjs';

export class AuthServiceMock {
  public user: BehaviorSubject<User> = new BehaviorSubject(userFactory(1));
  logout() {};
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
      ],
      imports: [
        CommonModule,
        ErrorsModule,
        MaterialModule
      ],
      providers: [
        {
          provide: AuthService,
          useClass: AuthServiceMock
        },
      ]
    }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should set user on init', () => {
    component.ngOnInit();
    expect(component.user.id).toEqual(1);
  });

  test('should call logout', () => {
    const spy = jest.spyOn(component['authService'], 'logout');
    component.logout();
    expect(spy).toHaveBeenCalled();
  });
});
