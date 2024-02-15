import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesFormulaComponent } from './pages-formula.component';

describe('PagesFormulaComponent', () => {
  let component: PagesFormulaComponent;
  let fixture: ComponentFixture<PagesFormulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagesFormulaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesFormulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
