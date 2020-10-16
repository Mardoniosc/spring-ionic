import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Pedido } from "../../models/pedido";
import { PedidoService } from "../../services/domain/pedido.service";
/**
 * Generated class for the PedidosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-pedidos",
  templateUrl: "pedidos.html",
})
export class PedidosPage {
  pedidos: Pedido[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pedidoService: PedidoService,
  ) {}

  ionViewDidLoad() {
    this.loadPedidosUser();
  }

  loadPedidosUser(){
    this.pedidoService.findAll()
      .subscribe(
        data => {
          this.pedidos = data['content'];
        },
        err => {
          console.error(err)
        }
      )
  }
}
