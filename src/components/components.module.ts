import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { WorkspaceComponent } from "./workspace/workspace.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MonacoEditorModule.forRoot(),
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot()
  ],
  declarations: [
  	WorkspaceComponent,
  ],
  exports: [
  	WorkspaceComponent,
  ],
  entryComponents: [
  	WorkspaceComponent,
  ]
})
export class ComponentsModule { }
