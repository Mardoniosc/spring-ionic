import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { StorangeService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storange: StorangeService,
    public clienteService: ClienteService
  ) {}

  ionViewDidLoad() {
    this.items = []

    let localUser = this.storange.getLocalUser();
    if(localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
          .subscribe(
            data => {
              this.items = data['enderecos'];
            },
            err => {
              if(err.status == 403){
                this.navCtrl.setRoot('HomePage')
              }
            }
          )
    } else {
      this.navCtrl.setRoot('HomePage')
    }

  }

}
