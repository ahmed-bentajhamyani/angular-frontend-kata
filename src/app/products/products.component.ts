import { Component, inject } from "@angular/core";
import { ProductsSkeletonComponent } from "./skeletons/products-skeleton.component";
import { NgFor, NgIf } from "@angular/common";
import { ProductService } from "../services/product.service";
import { Product } from "../models/product.model";
import { ProductCardComponent } from "./components/product-card.component";

@Component({
    selector: 'fk-products',
    standalone: true,
    imports: [
        NgIf,
        NgFor,
        ProductCardComponent,
        ProductsSkeletonComponent,
    ],
    template: `
        <div class="mb-16 w-full">
            <div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
                <ng-container *ngFor="let product of products">
                    <fk-product-card [product]="product"></fk-product-card>
                </ng-container>
            </div>
        </div>
    `,
})
export class ProductsComponent {
    private readonly productService = inject(ProductService);
    products: Product[] = [];

    ngOnInit() {
        this.productService.getProducts().subscribe(res => this.products = res)
    }
}