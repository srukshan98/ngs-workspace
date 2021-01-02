import { NoTabComponent } from './no-tab/no-tab.component';
import { TabComponent } from './tab/tab.component';
import { MaterialModule } from './material.module';
import { NgsWorkspaceModule } from 'ngs-workspace';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    TabComponent,
    NoTabComponent
  ],
  imports: [
    BrowserModule,
    NgsWorkspaceModule.forRoot({
      maxTabCount: 5,
      placeholderComponent: NoTabComponent
    }),
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
