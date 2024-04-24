import { CurrencyPipe, NgClass, NgFor, NgIf, NgTemplateOutlet } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { Store } from "@ngrx/store";
import { CartProductCardComponent } from "./components/cart-product-card.component";
import { ProductService } from "src/app/services/product.service";
import { Product } from "src/app/models/product.model";
import { CartState } from "src/app/store/cart.reducers";
import { CartItem } from "src/app/models/cart-item.model";
import { selectCartProducts, selectCartQuantity } from "src/app/store/cart.selectors";
import { deleteAll } from "src/app/store/cart.actions";
import { CartSkeletonComponent } from "./skeletons/cart-skeleton.component";

@Component({
    selector: 'fk-cart',
    standalone: true,
    imports: [
        CartProductCardComponent,
        CartSkeletonComponent,
        NgClass,
        NgFor,
        NgIf,
        NgTemplateOutlet,
        MatDialogModule,
        MatIconModule,
        CurrencyPipe
    ],
    templateUrl: './cart.component.html'
})
export class CartComponent {
    private readonly store = inject(Store<CartState>);
    private readonly productService = inject(ProductService);

    isLoading = true;
    isCalculating = true;

    cartProducts!: CartItem[];
    cartQuantity!: number;
    products!: Product[];

    ngOnInit() {
        this.productService.getProducts().subscribe(res => {
            this.products = res;
            this.isLoading = false;
        })
        this.store.select(selectCartProducts).subscribe((res) => {
            this.cartProducts = res;
        });
        this.store.select(selectCartQuantity).subscribe((res) => {
            this.cartQuantity = res;
        });
    }

    getProduct(id: number) {
        return this.products?.find(p => p.id === id);
    }

    calculateSubtotal() {
        return this.cartProducts.reduce((total: number, cartProduct: CartItem) => {
            const product = this.products?.find((a) => a.id === cartProduct.id);
            return total + (product?.price || 0) * cartProduct.quantity;
        }, 0)
    }

    deleteAll() {
        this.store.dispatch(deleteAll());
    }
}
