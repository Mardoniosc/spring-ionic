import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from '../../config/api.config'
import { PedidoDTO } from "../../models/pedido.dto";

@Injectable()
export class PedidoService {

  constructor(public http: HttpClient){}

  inserti(obj: PedidoDTO){
    return this.http.post(
      `${API_CONFIG.baseUrl}/pedidos`,
      obj,
      {
        observe: 'response',
        responseType: 'text'
      },
    )
  }

  findAll(){
    return this.http.get(`${API_CONFIG.baseUrl}/pedidos`)
  }
}
