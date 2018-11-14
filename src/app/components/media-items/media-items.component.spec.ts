import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaItemsComponent } from './media-items.component';

describe('MediaItemsComponent', () => {
  let component: MediaItemsComponent;
  let fixture: ComponentFixture<MediaItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
