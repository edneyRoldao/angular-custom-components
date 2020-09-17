import {NgModule} from '@angular/core';
import {MaterialAutocompleteComponent} from './material-autocomplete.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [MaterialAutocompleteComponent],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatAutocompleteModule
    ],
    exports: [MaterialAutocompleteComponent]
})
export class MaterialAutocompleteModule { }
