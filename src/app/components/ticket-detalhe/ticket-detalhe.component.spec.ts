import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketDetalheComponent } from './ticket-detalhe.component';

describe('TicketDetalheComponent', () => {
  let component: TicketDetalheComponent;
  let fixture: ComponentFixture<TicketDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
