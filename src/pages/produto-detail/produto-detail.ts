import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item: ProdutoDTO

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public cartService: CartService
  ) {}

  ionViewDidLoad() {
    let produto_id = this.navParams.get('produto_id');
    this.produtoService.findById(produto_id)
      .subscribe(
        data => {
          this.item = data
          this.getImageUrlIfExists()
        },
        err => console.log(err)
      )
  }

  getImageUrlIfExists(){
    this.produtoService.getImageFromBucket(this.item.id)
      .subscribe(
        data => {
          this.item.imageUrl = `${API_CONFIG.baseBucket}/prod${this.item.id}.jpg`
        },
        err => console.log(err)
      )
  }

  addToCart(produto: ProdutoDTO){
    this.cartService.addProduto(produto)
    this.navCtrl.setRoot('CartPage')
  }

}
