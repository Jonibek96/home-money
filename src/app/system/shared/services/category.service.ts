import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {CategoryModel} from '../model/category.model';

@Injectable()
export class CategoryService {
  constructor(private http: HttpClient) {
  }

  addCategory(category: CategoryModel): Observable<any> {
    return this.http.post(`http://localhost:3000/categories`, category);
  }

  getCategory(): Observable<any> {
    return this.http.get('http://localhost:3000/categories');
  }

  updateCategory(category: CategoryModel): Observable<any> {
    return this.http.put(`http://localhost:3000/categories/${category.id}`, category);
  }

  getCategoryById(id: number): Observable<any> {
    return this.http.get(`http://localhost:3000/categories/${id}`);
  }
}
