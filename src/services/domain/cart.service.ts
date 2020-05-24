import { Injectable } from "@angular/core";
import { StorangeService } from "../storage.service";
import { Cart } from "../../models/cart";
import { ProdutoDTO } from "../../models/produto.dto";


@Injectable()
export class CartService {

  constructor(public storage: StorangeService){}

  createOrClearCart(): Cart {
    let cart: Cart = {items: []}
    this.storage.setCart(cart)
    return cart
  }

  getCart(): Cart {
    let cart: Cart = this.storage.getCart()
    if(cart == null){
      cart = this.createOrClearCart()
    }
    return cart
  }

  addProduto(produto: ProdutoDTO): Cart {
    let cart = this.getCart()
    let position = cart.items.findIndex(p => p.produto.id == produto.id)
    if(position == -1){
      cart.items.push({ quantidade: 1, produto: produto })
    }

    this.storage.setCart(cart)
    return cart
  }

}
