import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemanTableComponent } from './pokemon-table.component';

describe('PokemanTableComponent', () => {
  let component: PokemanTableComponent;
  let fixture: ComponentFixture<PokemanTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemanTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemanTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
