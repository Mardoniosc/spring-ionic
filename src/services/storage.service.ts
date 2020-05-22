import { Injectable } from "@angular/core";
import { LocalUser } from "../models/localUser";
import { STORAGE_KEYS } from "../config/storangeKeys.config";

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
}
