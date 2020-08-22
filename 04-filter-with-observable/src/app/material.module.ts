import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    MatListModule
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatCheckboxModule,
        MatRadioModule,
        MatSelectModule,
        MatListModule
    ],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatRadioModule,
        MatSelectModule,
        MatCardModule,
        MatListModule
    ]
})
export class MaterialModule { }
