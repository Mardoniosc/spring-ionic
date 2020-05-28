import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { StorangeService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[]

  pedido: PedidoDTO

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storange: StorangeService,
    public clienteService: ClienteService,
    public cartService: CartService
  ) {}

  ionViewDidLoad() {
    this.items = []

    let localUser = this.storange.getLocalUser();
    if(localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
          .subscribe(
            data => {
              this.items = data['enderecos'];

              let cart = this.cartService.getCart()

              this.pedido = {
                cliente: {id: data['id']},
                enderecoDeEntrega: null,
                pagamento: null,
                itens: cart.items.map(x => {
                  return {
                    quantidade: x.quantidade,
                    produto: { id: x.produto.id }
                  }
                })
              }
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

  nextPage(endereco: EnderecoDTO){
    this.pedido.enderecoDeEntrega = {id: endereco.id}
    console.log(this.pedido)
  }

}
