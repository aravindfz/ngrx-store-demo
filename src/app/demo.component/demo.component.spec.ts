import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DemoComponent } from 'app/demo.component/demo.component';
import { DemoService } from 'app/demo.component/demo.service';
import { StoreModule, Store } from '@ngrx/store';
import { demoSlice, ACTIONS } from 'app/common.store/reducer';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppStore } from 'app/common.store/app.store';
import * as _ from "lodash";
import { By } from '@angular/platform-browser';


describe('DemoComponentComponent', () => {
  let component: DemoComponent;
  let fixture: ComponentFixture<DemoComponent>;
  let store: Store<AppStore>;
  let demoService: DemoService;
  let tableData = [
    { "name": "Ethelind", "address": "446 Lotheville Drive" },
    { "name": "Aron", "address": "31406 Lakeland Terrace" }
  ];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DemoComponent],
      providers: [DemoService],
      imports: [
        StoreModule.provideStore({ demoSlice }),
        FormsModule, HttpModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoComponent);
    component = fixture.componentInstance;
    store = fixture.debugElement.injector.get(Store);
    demoService = fixture.debugElement.injector.get(DemoService);
    store.dispatch({
      type: ACTIONS.LOAD_DATA,
      payload: {
        demoSlice: tableData
      }
    });
  });

  it('should be created', async(() => {
    expect(component).toBeTruthy();
  }));
  it('store to be defined', async(() => {
    expect(store).toBeDefined();
  }));
  it('data is there in component', async(() => {
    expect(component.data).toBeDefined();
  }));

  it('table data is available', () => {
    fixture.detectChanges();
    let el: HTMLElement = fixture.debugElement.query(By.css('table tr td')).nativeElement;
    expect(el.innerText).toBe('Ethelind');
  });
});
