import {Component, OnDestroy, OnInit} from '@angular/core';
import { Product } from '../models/product.model';
import {ProductService} from '../services/product.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-list',
    templateUrl: 'list.component.html',
    styleUrls: ['list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

    private _subscription: Subscription;
    soldProducts: Product[] = [];

    constructor(private productService: ProductService) {
    }

    ngOnInit() {
        this._subscription = this.productService.productsSubject.subscribe((data: Product[]) => {
           this.soldProducts = data;
        });
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }

}
