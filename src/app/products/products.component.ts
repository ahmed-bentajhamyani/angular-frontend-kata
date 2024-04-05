import { Component, inject } from "@angular/core";
import { CommonModule, NgFor, NgIf } from "@angular/common";
import { ProductService } from "../services/product.service";
import { Product } from "../models/product.model";
import { ProductCardComponent } from "./components/product-card.component";
import { Observable, combineLatest, map, of } from "rxjs";

@Component({
    selector: 'fk-products',
    standalone: true,
    imports: [
        NgIf,
        NgFor,
        ProductCardComponent,
        CommonModule
    ],
    template: `
        <div class="mb-16 w-full">
            <div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
                <ng-container *ngFor="let product of (products$ | async)">
                    <fk-product-card [product]="product"></fk-product-card>
                </ng-container>
            </div>
        </div>
    `,
})
export class ProductsComponent {
    private readonly productService = inject(ProductService);
    products$!: Observable<Product[]>;

    ngOnInit() {
        combineLatest([
            this.productService.searchQuery$,
            this.productService.getProducts(),
        ])
            .pipe(
                map(([searchQuery, products]) => {
                    if (!searchQuery || searchQuery.trim() === '') {
                        return products;
                    }
                    return products?.filter(
                        ({ title, description }) =>
                            title.toLowerCase().includes(searchQuery) ||
                            description.toLowerCase().includes(searchQuery)
                    );
                })
            )
            .subscribe((filteredProducts) => {
                if (filteredProducts) {
                    this.products$ = of(filteredProducts);
                }
            });
    }
}