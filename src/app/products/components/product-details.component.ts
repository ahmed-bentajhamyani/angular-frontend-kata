import { CurrencyPipe } from "@angular/common";
import { Component, Inject, inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { Product } from "src/app/models/product.model";
import { MatIconModule } from '@angular/material/icon';
import { Store } from "@ngrx/store";
import { addToCart } from "src/app/store/cart.actions";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { AddedToCartSnackBarComponent } from "./snack_bar/added-to-cart-snack-bar.component";

@Component({
    selector: 'fk-product-details',
    standalone: true,
    imports: [
        MatDialogModule,
        CurrencyPipe,
        MatIconModule,
        MatSnackBarModule
    ],
    template: `
        <button mat-dialog-close class="flex justify-end w-full p-2 outline-none">
            <mat-icon aria-hidden="false" aria-label="Example close icon" fontIcon="close" class="text-2xl"></mat-icon>
        </button>
        <mat-dialog-content class="mat-typography">
            <div class="grid grid-rows-2 lg:grid-cols-2 place-items-center gap-x-8 mt-6 text-gray-900">
                <img src={{product.image}} alt='' class='h-[300px] md:h-[400px]' />
                <div class="flex flex-grow flex-col justify-between bg-gray-100 px-5 py-5 w-full rounded-lg">
                    <p class='font-semibold text-teal-500 !mb-0'>{{product.category}}</p>

                    <div class="flex justify-between items-start space-x-3 font-bold">
                        <p class='text-lg md:text-2xl'>{{product.title}}</p>
                        <p class='md:text-xl whitespace-nowrap'>
                            {{ product.price | currency:'USD':'symbol':'1.2-2' }}
                        </p>
                    </div>

                    <p class='text-sm md:text-base mt-3'>{{product.description}}</p>
                    
                    <button (click)="addToCart(product.id)" mat-raised-button
                        class="flex justify-center items-center gap-1 w-full bg-primary text-white shadow-md mt-3 p-2.5 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2  focus:ring-primary/70 transition-all ease-in-out duration-300">
                        <mat-icon aria-hidden="false" aria-label="Example shopping_cart icon" fontIcon="shopping_cart" class="text-white"></mat-icon> Add to cart
                    </button>
                </div>
            </div>
        </mat-dialog-content>
    `
})
export class ProductDetailsComponent {
    public readonly snackBar = inject(MatSnackBar);
    public readonly store = inject(Store);

    constructor(@Inject(MAT_DIALOG_DATA) public product: Product) { }

    openSnackBar() {
        this.snackBar.openFromComponent(AddedToCartSnackBarComponent, {
            panelClass: ['added-to-cart-snackbar'],
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
            duration: 5000
        });
    }

    addToCart(itemId: number) {
        this.store.dispatch(addToCart({ itemId }));
        this.openSnackBar();
    }
}