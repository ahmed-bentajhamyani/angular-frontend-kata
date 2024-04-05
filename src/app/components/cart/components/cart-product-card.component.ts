import { CurrencyPipe } from "@angular/common";
import { Component, Input, inject } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { Store } from "@ngrx/store";
import { CartItem } from "src/app/models/cart-item.model";
import { Product } from "src/app/models/product.model";
import { addToCart, deleteItemFromCart, removeFromCart } from "src/app/store/cart.actions";

@Component({
    selector: 'fk-cart-product-card',
    standalone: true,
    imports: [
        MatIconModule,
        CurrencyPipe
    ],
    template: `
        <article class="flex justify-start items-center space-x-2 lg:space-x-7 p-4">
            <img src={{product.image}} alt='' class='w-16 md:w-20' />
            <div class="flex flex-1 justify-between items-center">
                <div class="">
                    <p class='!mb-1 font-medium text-base line-clamp-1'>{{product.title}}</p>
                    <p class='text-xs !mb-2 lg:text-sm line-clamp-1'>{{product.description}}</p>

                    <div class="flex justify-start items-center text-xs lg:text-sm space-x-2">
                        <button (click)="removeFromCart(product.id)" class="text-teal-500 disabled:text-teal-500/50 hover:text-teal-500/50" [disabled]="cartProduct.quantity <= 1">
                            <mat-icon aria-hidden="false" aria-label="Example remove icon" fontIcon="remove" class="text-2xl"></mat-icon>
                        </button>
                        <span class='text-text-primary'>{{cartProduct.quantity}}</span>
                        <button (click)="addToCart(product.id)" class="text-teal-500 disabled:text-teal-500/50 hover:text-teal-500/50">
                            <mat-icon aria-hidden="false" aria-label="Example add icon" fontIcon="add" class="text-2xl"></mat-icon>
                        </button>
                    </div>
                </div>
                <div class="flex flex-col justify-center items-center">
                    <p class='!mb-0 font-medium text-sm md:text-lg whitespace-nowrap lg:group-hover:hidden'>
                        {{ product.price | currency:'USD':'symbol':'1.2-2' }}
                    </p>
                    <button (click)="deleteItemFromCart(product.id)" class="!mt-0 text-teal-500 disabled:text-teal-500/50 hover:text-teal-500/50">
                        <mat-icon aria-hidden="false" aria-label="Example delete icon" fontIcon="delete" class="text-2xl"></mat-icon>
                    </button>
                </div>
            </div>
        </article>
    `
})
export class CartProductCardComponent {
    public readonly store = inject(Store);

    @Input() product!: Product;
    @Input() cartProduct!: CartItem;

    addToCart(itemId: number) {
        this.store.dispatch(addToCart({ itemId }));
    }

    removeFromCart(itemId: number) {
        this.store.dispatch(removeFromCart({ itemId }));
    }

    deleteItemFromCart(itemId: number) {
        this.store.dispatch(deleteItemFromCart({ itemId }));
    }
}