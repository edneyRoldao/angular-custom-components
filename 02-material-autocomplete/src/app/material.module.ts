import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from "@angular/material/button";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {AppService} from "./app.service";

@NgModule({
    imports: [
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatAutocompleteModule
    ],
    exports: [
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatAutocompleteModule
    ],
    providers: [
        AppService
    ]
})
export class MaterialModule { }
