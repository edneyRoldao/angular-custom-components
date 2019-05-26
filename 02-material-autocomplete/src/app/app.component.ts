import {Component, OnInit, ViewChild} from '@angular/core';
import {MaterialAutocompleteComponent} from "./material-autocomplete/material-autocomplete.component";
import {MaterialAutocompleteModel} from "./material-autocomplete/material-autocomplete.interface";
import {AppService} from "./app.service";
import {Animal} from "./animal.model";

@Component({
    selector: 'root',
    template: `

        <form #form="ngForm">
            <div class="container mt-5">
                <h4> Autocomplete showcase </h4>
                <material-autocomplete #materialAutocomplete [autocompleteOptions]="options"></material-autocomplete>
                <button class="ml-4" mat-fab color="primary" (click)="cleanSelectedValue()"> CLEAN </button>
                
                <div class="d-flex flex-row mt-5">
                    <h5> {{ selectedAnimal | json }} </h5>
                </div>
                
            </div>
        </form>
        
    `
})
export class AppComponent implements OnInit {

    @ViewChild('materialAutocomplete')
    materialAutocomplete: MaterialAutocompleteComponent;

    selectedAnimal: Animal;

    options: MaterialAutocompleteModel;

    constructor(private appService: AppService) { }

    ngOnInit() {

        this.options = {
            displayField: 'name',
            placeholder: 'animal name',
            filterValue: 'name',
            source: {
                service: this.appService,
                methodName: 'getAnimals'
            }
        };

        this.materialAutocomplete.onSelectChange.subscribe((selectedValue: Animal) => {
            this.selectedAnimal = selectedValue;
        });
    }

    cleanSelectedValue() {
        this.materialAutocomplete.clearInputValue();
    }


}
