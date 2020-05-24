import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    this.items = [
      {
        id: "1",
        logradouro: "Rua quinze de Novembro",
        numero: "300",
        complemento: "Apto 202",
        bairro: "Santa Mônica",
        cep: "48293822",
        cidade: {
          id: "1",
          nome: "Uberlândia",
          estado: {
            id: "1",
            nome: "Minas Gerais"
          }
        }
      },
      {
        id: "2",
        logradouro: "CSA 03 LT",
        numero: "12",
        complemento: "Apto 103",
        bairro: "Taguatinga-sul",
        cep: "72015035",
        cidade: {
          id: "3",
          nome: "Brasília",
          estado: {
            id: "27",
            nome: "Distrito Federal"
          }
        }
      }
    ]

  }

}
