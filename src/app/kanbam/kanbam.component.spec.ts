import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbamComponent } from './kanbam.component';

describe('KanbamComponent', () => {
  let component: KanbamComponent;
  let fixture: ComponentFixture<KanbamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanbamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KanbamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
