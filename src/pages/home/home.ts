import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds : CredenciaisDTO = {
    email : "",
    senha : ""
  }

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public auth: AuthService
  ) {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter(){
    this.auth.refreshToken()
      .subscribe(
        data => {
          this.auth.successfulLogin(data.headers.get('Authorization'))
          this.navCtrl.setRoot('CategoriasPage')
        },
        err => {console.log(err)}
      )
  }

  login(){
    this.auth.authenticate(this.creds)
      .subscribe(
        data => {
          this.auth.successfulLogin(data.headers.get('Authorization'))
          this.navCtrl.setRoot('CategoriasPage')
        },
        err => {console.log(err)}
      )
  }

}
