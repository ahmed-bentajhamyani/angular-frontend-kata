import { Component } from "@angular/core";
import { ProductCardSkeletonComponent } from "./product-card-skeleton.component";
import { NgFor } from "@angular/common";

@Component({
    selector: 'fk-products-skeleton',
    standalone: true,
    imports: [
        NgFor,
        ProductCardSkeletonComponent,
    ],
    template: `
        <div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-16 animate-pulse">
            <ng-container *ngFor="let item of [].constructor(5); let i = index">
                <fk-product-card-skeleton />
            </ng-container>
        </div>
    `
})
export class ProductsSkeletonComponent { }