import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>('/api/categories');
  }

  getById(id: string): Observable<Category> {
    return this.http.get<Category>(`/api/categories/${id}`);
  }

  add(name: string, image?: File): Observable<Category> {
    const fd = new FormData();
    fd.append('name', name);

    if (image) {
      fd.append('img', image, image.name);
    }
    return this.http.post<Category>('/api/categories', fd);
  }

  upload(id: string, name: string, image?: File): Observable<Category> {

    const fd = new FormData();
    fd.append('name', name);

    if (image) {
      fd.append('img', image, image.name);
    }

    return this.http.patch<Category>(`/api/categories/${id}`, fd);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`/api/categories/${id}`);
  }
}
