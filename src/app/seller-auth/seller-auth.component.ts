import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  showLogin=false;
  authError:string='';

 constructor(private seller:SellerService,private router:Router ){}

 ngOnInit(){
  this.seller.reloadSeller()
 }

   signUp(data:SignUp):void{  
   this.seller.userSignUp(data);    
   }
   
   login(data:SignUp):void{  
    this.authError="";
    //console.warn(data); 
    this.seller.userLogin(data);
    this.seller.isLoginerror.subscribe((error)=>
    {
      if(error){
        this.authError='Email or Password is incorrect'
      }
    })
    }
   openLogin(){
    this.showLogin=true;
   }
   opensignup(){
    this.showLogin=false;
   }
 }


