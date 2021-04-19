
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from './shared/-product.service';

export class ProductModel
{
  Id?:any;
  Name:string;
  Description:string;
  Price:string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  productList:ProductModel[]=[];
  isEdit:boolean=false;

  totalLength:any;
  page:number = 1;

  public errorMsg;

  constructor(private pro_service :ProductService){}
  

  ngOnInit(): void {
    
  this._getall();
  
  }

  //title = 'crud';
  product:ProductModel = new ProductModel();
  
  onSubmit(form:NgForm):void{
    if(!this.isEdit){
    delete form.value.Id;
    this.pro_service.create(form.value)
    .subscribe(res=> {
      console.log(res);
      form.resetForm();
      this._getall();
    },(error)=>{
      this.errorMsg = error
    });
    
  }
  else{

    this.pro_service.update(form.value)
    .subscribe(res=> {
     form.resetForm();
     this.isEdit=false;
      this._getall();
    },
    (error)=>{
      this.errorMsg;
    }
    );
    }
  
  

  }

  _getall(){
    this.pro_service.getAll()
    .subscribe(res =>{
      console.log(res);
      this.productList = res;
      this.totalLength = res.length;
      
    },(error)=>{
      this.errorMsg = error
    })
  }
edit(data:ProductModel):void{
  
this.isEdit = true;
this.pro_service.getone(data.Id)
    .subscribe(res =>{
      console.log(res);
      this.product = res;
    },
    (error)=>{
      this.errorMsg;
    }
    );
  }
  deleteall(data:ProductModel):void{
  const confirm = window.confirm("Are you sure want to delete?")
if(confirm){    
    this.pro_service.deleteproduct(data.Id)
        .subscribe(res =>{
          console.log(res);
          this._getall();
        },
        (error)=>{
          this.errorMsg = error
        });
      }
      }

    }
