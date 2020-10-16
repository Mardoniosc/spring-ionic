import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidosPage } from './pedidos';
import { PedidoService } from '../../services/domain/pedido.service';

@NgModule({
  declarations: [
    PedidosPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidosPage),
  ],
  providers: [ PedidoService ]
})
export class PedidosPageModule {}
