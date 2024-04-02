import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from '../../environements/environment';
import { Observable } from "rxjs";
import { Product } from "../models/product.model";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private readonly http = inject(HttpClient);

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(environment.apiUrl);
    }

    getProduct(id: number): Observable<Product> {
        return this.http.get<Product>(environment.apiUrl + id);
    }

    getProductsByCategory(category: string): Observable<Product[]> {
        return this.http.get<Product[]>(environment.apiUrl + 'category/' + category);
    }
}