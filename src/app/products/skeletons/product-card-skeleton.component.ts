import { Component } from "@angular/core";

@Component({
    selector: 'fk-product-card-skeleton',
    standalone: true,
    template: `
        <div class="flex flex-col justify-start items-center w-full rounded-3xl py-3">
            <div class='w-full h-44 bg-gray-200 rounded-t-lg'></div>

            <div class="flex flex-col justify-between items-start w-full mt-2 p-">
                <div class="w-full h-3.5 bg-gray-200 rounded"></div>
                <div class="w-full h-2.5 bg-gray-200 rounded mt-2"></div>
                <div class="w-[75%] h-2.5 bg-gray-200 rounded mt-2"></div>
                <div class="w-full h-9 bg-gray-200 rounded-md mt-3"></div>
            </div>
        </div>
    `
})
export class ProductCardSkeletonComponent { }