import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBkComponent } from './menu-bk.component';

describe('MenuBkComponent', () => {
  let component: MenuBkComponent;
  let fixture: ComponentFixture<MenuBkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuBkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuBkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
