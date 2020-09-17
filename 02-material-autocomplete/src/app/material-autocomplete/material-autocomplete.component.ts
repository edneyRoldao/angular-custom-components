import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material';
import {Observable, of, Subject} from 'rxjs';
import { startWith, map, tap, switchMap, debounceTime } from 'rxjs/operators';
import { MaterialAutocompleteModel } from './material-autocomplete.interface';

@Component({
    selector: 'app-material-autocomplete',
    templateUrl: 'material-autocomplete.component.html',
    styleUrls: [
        'material-autocomplete.component.scss'
    ]
})
export class MaterialAutocompleteComponent implements OnInit, OnChanges {

    @ViewChild('autocompleteTemplate')
    autocompleteTemplate: MatAutocomplete;

    @Input()
    autocompleteOptions: MaterialAutocompleteModel;

    items: [];
    onSelectChange: Observable<any>;
    filteredOptions: Observable<any>;
    autocompleteControl: FormControl;
    options: MaterialAutocompleteModel;

    private _onOptionSelectEmmiter: Subject<any>;

    constructor() {
        this.items = [];
        this._onOptionSelectEmmiter = new Subject();
        this.autocompleteControl = new FormControl();
        this.onSelectChange = this._onOptionSelectEmmiter.asObservable();
    }

    ngOnInit() {
        this._setupDefaultOptions();
        this._setupAutocomplete();
        this._handleOptionsSelected();
    }

    ngOnChanges(changes: SimpleChanges) {
        const valueChanged = changes.autocompleteOptions;

        if (valueChanged && valueChanged.currentValue !== valueChanged.previousValue) {
            this.options = changes.autocompleteOptions.currentValue;
        }
    }

    clearInputValue(): void {
        this.autocompleteControl.setValue({});
        this._onOptionSelectEmmiter.next({});
    }

    displayFn(displayValue?: any): string | undefined {
        return displayValue ? displayValue[this.options.displayField] : undefined;
    }

    private _setupAutocomplete(): void {
        this.filteredOptions = this.autocompleteControl.valueChanges.pipe(
            startWith<string | any>(''),
            map(value => typeof value === 'string' ? value : value[this.options.filterFieldName]),
            tap((filterValue: string) => {
                if (!filterValue) {
                    this._onOptionSelectEmmiter.next({});
                }
            }),
            debounceTime(this.options.debounceTime),
            switchMap(searchType => this.options.filterFieldName ? this._filter(searchType) : this.items.slice()),
            tap((list: any[]) => {
                if (!list.length) {
                    this._onOptionSelectEmmiter.next({});
                }
            })
        );
    }

    private _filter(searchValue: string): Observable<any[]> {
        if (!searchValue && this.autocompleteOptions.notCallServiceWhenEmpty) {
            return of([]);
        }

        const service = this.options.source.service;
        const method = this.options.source.methodName;
        return service[method](searchValue, this.options.filterFieldName);
    }

    private _handleOptionsSelected() {
        this.autocompleteTemplate.optionSelected.pipe(
            map(selected => selected.option.value),
            map(value => this._onOptionSelectEmmiter.next(value))
        ).subscribe();
    }

    private _setupDefaultOptions() {
        if (this.autocompleteOptions.initialValue) {
            this.autocompleteControl.setValue(this.autocompleteOptions.initialValue);
        }

        this.autocompleteOptions.debounceTime = !!this.autocompleteOptions.debounceTime ? this.autocompleteOptions.debounceTime : 500;
        this.autocompleteOptions.appearance = !!this.autocompleteOptions.appearance ? this.autocompleteOptions.appearance : 'outline';
    }

}
