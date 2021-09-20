import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products : any = [];
  public grandTotal !: number;
  discountAmt:number = 0
  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
      this.discountAmt = this.discount()
    })
  }
  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }
  emptycart(){
    this.cartService.removeAllCart();
  }
  discount(){
   return this.grandTotal > 100 && this.grandTotal <= 500 ? (this.grandTotal /100) * 10 : this.grandTotal > 500 ? (this.grandTotal /100) * 20 : 0

  }

  afterDiscPrice(){
    return this.grandTotal - this.discountAmt
  }


}
