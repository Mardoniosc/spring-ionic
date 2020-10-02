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

  items: ProdutoDTO[] = [];

  page: number = 0;

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
    this.produtoService.findByCategoria(categoria_id, this.page, 10)
      .subscribe(
        data => {
          let start = this.items.length;
          this.items = this.items.concat(data['content']);
          let end = this.items.length -1;
          loader.dismiss();
          this.loadImageUrls(start, end);
        },
        err => {
          loader.dismiss();
          console.log(err)
        }
      )
  }
  loadImageUrls(start: number, end: number) {
    for (var i=start; i<=end; i++){
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
    this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      event.complete();
    }, 1000);
  }

  doInfinite(infitiScroll) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      infitiScroll.complete();
    }, 1000);
  }
}
