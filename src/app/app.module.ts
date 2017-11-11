import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from "@ngrx/store";
import { AppComponent } from './app.component';
import { demoSlice } from "app/common.store/reducer";
import { DemoComponent } from "app/demo.component/demo.component";
import { DemoService } from "app/demo.component/demo.service";
import { EditableComponent } from "app/editable.component/editable.component";
import { EditableService } from "app/editable.component/editable.component.service";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent, DemoComponent, EditableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore({
      demoSlice
    }),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    })
  ],
  providers: [DemoService, EditableService],
  bootstrap: [AppComponent]
})
export class AppModule { }
