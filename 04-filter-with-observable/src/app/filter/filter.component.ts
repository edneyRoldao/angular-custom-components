import { Component } from '@angular/core';
import { Filter } from '../models/filter.model';
import {ProductService} from '../services/product.service';

@Component({
    selector: 'app-filter',
    templateUrl: 'filter.component.html',
    styleUrls: ['filter.component.scss']
})
export class FilterComponent {

    quinzenaFilter: Filter = {month: '', year: '', quinzena: 1};
    years: number[] = [2015, 2016, 2017, 2018, 2019, 2020];
    months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    constructor(private productService: ProductService) {
    }

    search() {
        this.productService.getFilteredProducts(this.quinzenaFilter);
    }

}
