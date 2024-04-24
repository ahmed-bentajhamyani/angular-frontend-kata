import { Component } from "@angular/core";
import { CartProductCardSkeletonComponent } from "./cart-product-card-skeleton.component";
import { NgFor } from "@angular/common";

@Component({
    selector: 'fk-cart-skeleton',
    standalone: true,
    imports: [
        NgFor,
        CartProductCardSkeletonComponent,
    ],
    template: `
        <div class="grid grid-rows-1 gap-4 animate-pulse">
            <ng-container *ngFor="let item of [].constructor(3)">
                <fk-cart-product-card-skeleton />
            </ng-container>
        </div>
    `
})
export class CartSkeletonComponent { }