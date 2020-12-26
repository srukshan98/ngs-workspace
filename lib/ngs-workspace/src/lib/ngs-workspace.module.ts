import { NgModule } from '@angular/core';
import { NgsWorkspaceComponent } from './ngs-workspace.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [NgsWorkspaceComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    DragDropModule,
    MatButtonModule
  ],
  exports: [NgsWorkspaceComponent]
})
export class NgsWorkspaceModule { }
