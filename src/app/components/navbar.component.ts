import { CommonModule, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { CartComponent } from './cart/cart.component';
import { selectCartQuantity } from '../store/cart.selectors';
import { Observable, Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { AppState } from '../store/app.state';
import { ProductService } from '../services/product.service';

@Component({
    selector: 'fk-navbar',
    standalone: true,
    imports: [
        MatIconModule,
        NgClass,
        CommonModule,
        MatDialogModule,
    ],
    template: `
         <header class='w-full h-16 fixed top-0 left-0 z-30 bg-white'>
            <div class='container relative mx-auto px-5 md:px-10 py-3 h-16 flex items-center justify-between transition-all duration-500 ease-in'>
                <a class="cursor-pointer">
                    <h1 class="font-semibold text-xl">Frontend Kata</h1>
                </a>

                <!-- Search box desktop -->
                <div class='hidden md:flex flex-col items-center'>
                    <div class="flex items-center space-x-2 p-2 bg-gray-100 text-sm text-text-primary/75 w-[450px] h-10 rounded-lg">
                        <span class="opacity-70">   
                            <mat-icon aria-hidden="false" aria-label="Example search icon" fontIcon="search" class="text-2xl"></mat-icon>
                        </span>
                        <input type="text" class='bg-transparent w-full focus:outline-none' placeholder='Search products...' (keyup)="searchQueryChanged($event)" />
                    </div>
                </div>

                <!-- Search box mobile -->
                <div [ngClass]="{'flex md:hidden': mobileSearchBoxOpen, 'hidden ': !mobileSearchBoxOpen}" class='absolute flex-col items-center top-0 left-0'>
                    <div class="flex items-center justify-start p-2 bg-white text-sm text-text-primary/75 w-screen h-16">
                        <button class="w-11 h-11 mr-2" (click)="showSearchBoxOpen()">
                            <mat-icon aria-hidden="false" aria-label="Example arrow_back icon" fontIcon="arrow_back" class="text-2xl"></mat-icon>
                        </button>
                        <input type="text" class='flex flex-1 bg-transparent w-full focus:outline-none' placeholder='Search products...' (keyup)="searchQueryChanged($event)" />
                    </div>
                </div>

                <div class='flex items-center [&>button>mat-icon]:!flex [&>button>mat-icon]:!justify-center [&>button>mat-icon]:!items-center [&>button>mat-icon]:!w-10 [&>button>mat-icon]:!h-10'>
                    <button (click)="showSearchBoxOpen()" class="md:hidden">
                        <mat-icon aria-hidden="false" aria-label="Example search icon" fontIcon="search"></mat-icon>
                    </button>
                    <div>
                        <div class='absolute top-3 right-4 md:right-9 flex items-center justify-center h-4 w-4 bg-rose-600 rounded-full text-white' [ngClass]="{'hidden': mobileSearchBoxOpen}"> 
                            <span class="text-xs">{{cartQuantity$ | async}}</span>
                        </div>
                        <button (click)="openCart()">
                            <mat-icon aria-hidden="false" aria-label="Example shopping_cart icon" fontIcon="shopping_cart"></mat-icon>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    `
})
export class NavbarComponent {
    public readonly dialog = inject(MatDialog);
    private readonly store = inject(Store<AppState>);
    private readonly productService = inject(ProductService);

    mobileSearchBoxOpen = false;
    cartQuantity$: Observable<number> = this.store.select(selectCartQuantity);
    searchQuery = new Subject<string>();

    constructor() {
        this.searchQuery
            .pipe(
                debounceTime(300), // Wait for 300ms pause in events
                distinctUntilChanged() // Only emit if the current value is different than the last
            )
            .subscribe(res => this.updateSearchQuery(res))
    }

    searchQueryChanged(event: any) {
        this.searchQuery.next(event.target.value);
    }

    updateSearchQuery(searchTerm: string) {
        this.productService.updateSearchQuery(searchTerm);
    }

    openCart() {
        const dialogRef = this.dialog.open(CartComponent);

        dialogRef.afterClosed().subscribe();
    }

    showSearchBoxOpen() {
        this.searchQuery.next('');
        this.mobileSearchBoxOpen = !this.mobileSearchBoxOpen;
    }
}
