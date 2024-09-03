import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { login, SignUp } from '../data-type';
import { BehaviorSubject, observeOn } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  issellerLoggedIn= new BehaviorSubject<boolean>(false);
  isLoginerror = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private route:Router) { }

  userSignUp(data:SignUp){
    let result= this.http.post("http://localhost:3000/seller", 
      data,{observe:'response'}).subscribe((result)=>{
        this.issellerLoggedIn.next(true);
        localStorage.setItem('seller',JSON.stringify(result.body));
        this.route.navigate(['seller-home']);        
      })   
  }
  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.issellerLoggedIn.next(true);
      this.route.navigate(['seller-home']); 
    }
  }
  userLogin(data: login) {
    console.warn(data);
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
    {observe:'response'}).subscribe((result:any)=>{
      console.warn(result);
      if(result && result.body && result.body.length){
        console.warn('user Logged in');
        localStorage.setItem('seller' ,JSON.stringify(result.body));
        this.route.navigate(['seller-home']);
      }
      else{
        console.warn('login failed');
        this.isLoginerror.emit(true);
      }
    })
 }
  

}


