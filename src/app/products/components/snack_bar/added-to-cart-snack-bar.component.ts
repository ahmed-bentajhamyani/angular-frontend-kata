import { Component, inject } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarRef } from "@angular/material/snack-bar";

@Component({
    selector: 'added-to-cart-snack-bar',
    template: `
        <span class="flex items-center text-text-primary font-medium text-lg">
            <mat-icon aria-hidden="false" aria-label="Example done icon" fontIcon="done" class="text-primary"></mat-icon> Added to cart
        </span>
    `,
    standalone: true,
    imports: [MatIconModule]
})
export class AddedToCartSnackBarComponent {
    snackBarRef = inject(MatSnackBarRef);
}