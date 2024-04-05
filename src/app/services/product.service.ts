import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from '../../environements/environment';
import { BehaviorSubject, Observable } from "rxjs";
import { Product } from "../models/product.model";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private readonly http = inject(HttpClient);
    private searchQuerySubject = new BehaviorSubject<string>('');
    searchQuery$ = this.searchQuerySubject.asObservable();

    updateSearchQuery(query: string): void {
        this.searchQuerySubject.next(query);
    }

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