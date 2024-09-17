import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent {
  productData:undefined | product;
  productMessage:undefined | string;

 constructor(private route:ActivatedRoute, private product:ProductService){}

 ngOnInit(){
  let productId = this.route.snapshot.paramMap.get('id');
  console.warn(productId);
  productId && this.product.getProductById(productId).subscribe((data)=>{
    console.warn(data);
    this.productData = data;
  })
 }
  updatenewProduct(data:product){
    console.warn(data);
    if(this.productData)
    {
      data.id = this.productData.id;
    }
    this.product.updateProductById(data).subscribe((result)=>{
      if(result){
        this.productMessage="Product has Updated"
      }
    });
    setTimeout(()=>{
      this.productMessage=undefined
    },3000)
    
  }
}
