import { Component } from "@angular/core";

@Component({
    selector: 'fk-cart-product-card-skeleton',
    standalone: true,
    template: `
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 items-center gap-x-4 w-full rounded-3xl py-1">
            <div class='col-span-1 w-24 h-24 bg-gray-200 rounded-lg'></div>

            <div class="sm:col-span-2 md:col-span-4 flex flex-col justify- items-start w-full">
                <div class="w-full h-3.5 bg-gray-200 rounded"></div>
                <div class="w-[65%] h-2.5 bg-gray-200 rounded mt-2"></div>
                <div class="w-[15%] h-5 bg-gray-200 rounded-md mt-3"></div>
            </div>
        </div>
    `
})
export class CartProductCardSkeletonComponent { }