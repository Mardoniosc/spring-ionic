import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';


@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingCtl: LoadingController,
  ) {}

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let categoria_id = this.navParams.get('categoria_id')
    let loader = this.presentLoading();
    this.produtoService.findByCategoria(categoria_id)
      .subscribe(
        data => {
          this.items = data['content']
          loader.dismiss();
          this.loadImageUrls()
        },
        err => {
          loader.dismiss();
          console.log(err)
        }
      )
  }
  loadImageUrls() {
    for (var i=0; i< this.items.length; i++){
      let item = this.items[i]
      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(
          data => {
            item.imageUrl = `${API_CONFIG.baseBucket}/prod${item.id}-small.jpg`
          },
          err => console.log(err)
        )
    }
  }

  showDetail(produto_id: string) {
    this.navCtrl.push('ProdutoDetailPage', {produto_id: produto_id})
  }

  presentLoading() {
    let loader = this.loadingCtl.create({
      content: "Aguarde...",
    });
    loader.present();
    return loader;
  }

  doRefresh(event) {
    this.loadData();
    setTimeout(() => {
      event.complete();
    }, 1000);
  }
}
