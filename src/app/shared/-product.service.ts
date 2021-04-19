import { Injectable } from '@angular/core';
import{HttpClient}from '@angular/common/http';
import { ProductModel } from '../app.component';
import {Observable,EMPTY, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  //----------post service-------
  create(data:ProductModel):Observable<ProductModel>{
    return this.http.post<ProductModel>("http://localhost:20900/api/shops",data)
    
    //Error handling
    .pipe(catchError(this.handlerError2))
  }
  handlerError2(error){
    return throwError(error.message||"Server Error")
  }
  
//-------put service-------
  update(data:ProductModel):Observable<ProductModel>{
    return this.http.put<ProductModel>("http://localhost:20900/api/shops/"+data.Id,data)
    
    //-----Error handling
    .pipe(catchError(this.handlerError3))
  }
  handlerError3(error){
    return throwError(error.message||"Server Error")
  }
  
  //-----------get service--------

getAll():Observable<ProductModel[]>{
  return this.http.get<ProductModel[]>("http://localhost:20900/api/shops")
  
  //-------Error handling------
  
  .pipe(catchError(this.handlerError))
  }
handlerError(error){
  return throwError(error.message||"Server Error")
}

//-------getid service-----

getone(Id:any):Observable<ProductModel>{
  return this.http.get<ProductModel>("http://localhost:20900/api/shops/"+Id)

  //---Error handling-----

  .pipe(catchError(this.handlerError5))
}
handlerError5(error){
  return throwError(error.message||"Server Error")
}

  
 //-------delete service-----
deleteproduct(Id:any):Observable<ProductModel>{
  return this.http.delete<ProductModel>("http://localhost:20900/api/shops/"+Id)

  //-----Error handling----
  .pipe(catchError(this.handlerError4))
}
handlerError4(error){
return throwError(error.message||"Server Error")

}
}






