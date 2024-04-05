import { CommonModule } from "@angular/common";
import { Component, Input, inject } from "@angular/core";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { RouterModule } from "@angular/router";
import { Product } from "src/app/models/product.model";
import { ProductDetailsComponent } from "./product-details.component";
import { Store } from "@ngrx/store";
import { addToCart } from "src/app/store/cart.actions";

@Component({
    selector: 'fk-product-card',
    standalone: true,
    imports: [
        RouterModule,
        CommonModule,
        MatDialogModule,
    ],
    template: `
        <article class="flex flex-col justify-start items-center bg-white rounded-lg px-5 py-3 shadow">
            <a (click)="openDialog()" class="cursor-pointer">
                <img src={{product.image}} alt='' class='h-36 mt-3' />
            </a>

            <div class="flex flex-col justify-between items-start w-full mt-6">
                <div class="flex justify-between items-center font-bold w-full">
                    <a (click)="openDialog()" class="cursor-pointer">
                        <p class='text-sm line-clamp-1'>{{product.title}}</p>
                    </a>
                    <p class='text-xs whitespace-nowrap'>
                        {{ product.price | currency:'USD':'symbol':'1.2-2' }}
                    </p>
                </div>
                <p class='text-sm w-full mt-1.5 line-clamp-1'>{{product.description}}</p>
            </div>

            <button mat-raised-button (click)="addToCart(product.id)"
                class="w-full bg-primary text-white shadow-md mt-3 p-2.5 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2  focus:ring-primary/70 transition-all ease-in-out duration-300">
                Add to cart
            </button>
        </article>
    `
})
export class ProductCardComponent {
    @Input()
    product!: Product;

    public readonly dialog = inject(MatDialog);
    public readonly store = inject(Store);

    openDialog() {
        const dialogRef = this.dialog.open(ProductDetailsComponent, {
            data: this.product,
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    addToCart(itemId: number) {
        this.store.dispatch(addToCart({ itemId }));
    }
}