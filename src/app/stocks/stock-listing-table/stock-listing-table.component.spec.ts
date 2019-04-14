import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockListingTableComponent } from './stock-listing-table.component';

describe('StockListingTableComponent', () => {
  let component: StockListingTableComponent;
  let fixture: ComponentFixture<StockListingTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockListingTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockListingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
