import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Subject } from 'rxjs';
import {Filter} from '../models/filter.model';

const products: Product[] = [
    {id: 1, description: 'Lg tv 75in', soldDate: {month: 1, year: 2015, quinzena: 1}},
    {id: 2, description: 'Denon receiver', soldDate: {month: 1, year: 2015, quinzena: 1}},
    {id: 3, description: 'macbook', soldDate: {month: 2, year: 2016, quinzena: 1}},
    {id: 4, description: 'dell monitor', soldDate: {month: 2, year: 2016, quinzena: 1}},
    {id: 5, description: 'sony headphone', soldDate: {month: 4, year: 2018, quinzena: 1}},
    {id: 6, description: 'edifier speakers', soldDate: {month: 4, year: 2018, quinzena: 1}},
    {id: 7, description: 'playstation 4', soldDate: {month: 7, year: 2019, quinzena: 2}},
    {id: 8, description: 'glass table', soldDate: {month: 7, year: 2019, quinzena: 2}},
    {id: 9, description: 'wood table', soldDate: {month: 8, year: 2020, quinzena: 2}},
    {id: 10, description: 'cook top', soldDate: {month: 8, year: 2020, quinzena: 2}},
    {id: 11, description: 'over', soldDate: {month: 10, year: 2020, quinzena: 2}},
    {id: 12, description: 'micro over', soldDate: {month: 10, year: 2020, quinzena: 2}},
];

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    public productsSubject = new Subject<Product[]>();

    getFilteredProducts(filter: Filter) {
        const filteredProducts = products.filter(p => p.soldDate.quinzena === filter.quinzena &&
                                                      p.soldDate.year === filter.year &&
                                                      p.soldDate.month === filter.month);
        this.productsSubject.next(filteredProducts);
    }

}
