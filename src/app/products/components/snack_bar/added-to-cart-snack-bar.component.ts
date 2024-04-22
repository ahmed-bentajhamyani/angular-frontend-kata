import { Component, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarRef } from "@angular/material/snack-bar";
import { CartComponent } from "src/app/components/cart/cart.component";

@Component({
    selector: 'added-to-cart-snack-bar',
    template: `
        <span class="flex items-center text-text-primary font-medium text-base cursor-pointer" (click)="openCart()">
            <mat-icon aria-hidden="false" aria-label="Example check_circle icon" fontIcon="check_circle" class="text-primary"></mat-icon>  Added to cart
        </span>
    `,
    standalone: true,
    imports: [MatIconModule]
})
export class AddedToCartSnackBarComponent {
    snackBarRef = inject(MatSnackBarRef);
    public readonly dialog = inject(MatDialog);

    openCart() {
        const dialogRef = this.dialog.open(CartComponent);

        dialogRef.afterClosed().subscribe();
    }
}