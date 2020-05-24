import { Injectable } from "@angular/core";
import { LocalUser } from "../models/localUser";
import { STORAGE_KEYS } from "../config/storangeKeys.config";
import { Cart } from "../models/cart";

@Injectable()
export class StorangeService {

  getLocalUser(): LocalUser {
    let usr = localStorage.getItem(STORAGE_KEYS.localUser)

    if (usr == null){
      return null
    }

    return JSON.parse(usr)
  }

  setLocalUser(obj: LocalUser) {
    if(obj == null){
      localStorage.removeItem(STORAGE_KEYS.localUser)
      return
    }

    localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj))
  }

  getCart(): Cart {
    let str = localStorage.getItem(STORAGE_KEYS.cart)
    if(str != null) {
      return JSON.parse(str)
    }

    return null
  }

  setCart(obj: Cart) {
    if(obj != null){
      localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj))
    } else {
      localStorage.removeItem(STORAGE_KEYS.cart)
    }
  }
}
