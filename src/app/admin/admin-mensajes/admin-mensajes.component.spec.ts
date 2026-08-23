import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMensajesComponent } from './admin-mensajes.component';

describe('AdminMensajesComponent', () => {
  let component: AdminMensajesComponent;
  let fixture: ComponentFixture<AdminMensajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMensajesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMensajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
