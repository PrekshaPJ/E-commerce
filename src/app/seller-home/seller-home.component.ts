import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {
  productList: undefined | product[];
  productMessage: undefined | string;
  icon = faTrash;
  icon_update= faEdit;
  constructor(private product: ProductService) { }

  ngOnInit() {
    this.list();
  }

  deleteProduct(id: number) {
    console.warn("test id", id);
    this.product.deleteProductById(id).subscribe((result) => {
      if (result) {
        this.productMessage = "Product Deleted successfully"
      }
      
    })
    setTimeout(() => {
      this.productMessage = undefined
    }, 3000)
  }

  updateProduct(){}

  list(){
  this.product.productList().subscribe((result) => {
    console.warn(result);
    this.productList = result;
  })
  }
}
