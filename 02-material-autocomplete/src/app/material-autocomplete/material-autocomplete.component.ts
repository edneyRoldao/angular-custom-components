import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { startWith, map, tap, switchMap } from 'rxjs/operators';
import { MaterialAutocompleteModel } from "./material-autocomplete.interface";

@Component({
    selector: 'material-autocomplete',
    templateUrl: 'material-autocomplete.component.html',
    styleUrls: [
        'material-autocomplete.component.scss'
    ]
})
export class MaterialAutocompleteComponent implements OnInit, OnChanges {

    @ViewChild('autocompleteTemplate')
    protected autocompleteTemplate: MatAutocomplete;

    @Input()
    protected autocompleteOptions: MaterialAutocompleteModel;

    onSelectChange: Observable<any>;
    options: MaterialAutocompleteModel;

    private onOptionSelectEmmiter: Subject<any>;

    protected items: [];
    protected filteredOptions: Observable<any>;
    protected autocompleteControl: FormControl;


    constructor() {
        this.items = [];
        this.onOptionSelectEmmiter = new Subject();
        this.autocompleteControl = new FormControl();
        this.onSelectChange = this.onOptionSelectEmmiter.asObservable();
    }

    ngOnInit() {
        if (this.autocompleteOptions.initialValue) {
            this.autocompleteControl.setValue(this.autocompleteOptions.initialValue)
        }

        this.initFilterOptions();
        this.handleOptionsSelected();
    }

    ngOnChanges(changes: SimpleChanges) {
        const valueChanged = changes.autocompleteOptions;

        if (valueChanged && valueChanged.currentValue !== valueChanged.previousValue) {
            this.options = changes.autocompleteOptions.currentValue;
        }
    }

    clearInputValue(): void {
        this.autocompleteControl.setValue({});
        this.onOptionSelectEmmiter.next({});
    }

    protected displayFn(displayValue?: any): string | undefined {
        return displayValue ? displayValue[this.options.displayField] : undefined;
    }

    private initFilterOptions(): void {
        this.filteredOptions = this.autocompleteControl.valueChanges.pipe(
            startWith<string | any>(''),
            map(value => typeof value === 'string' ? value : value[this.options.filterValue]),
            tap((filterValue: string) => {
                if (!filterValue) {
                    this.onOptionSelectEmmiter.next({});
                }
            }),
            switchMap(searchType => this.options.filterValue ? this.filter(searchType) : this.items.slice()),
            tap((list: any[]) => {
                if (!list.length) {
                    this.onOptionSelectEmmiter.next({});
                }
            })
        );
    }

    private filter(field: string): Observable<any[]> {
        const service = this.options.source.service;
        const method = this.options.source.methodName;
        return service[method](field, this.options.filterValue);
    }

    private handleOptionsSelected() {
        this.autocompleteTemplate.optionSelected.pipe(
            map(selected => selected.option.value),
            map(value => this.onOptionSelectEmmiter.next(value))
        ).subscribe();
    }

}
