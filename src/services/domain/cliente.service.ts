import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorangeService } from "../storage.service";

@Injectable()
export class ClienteService {

  constructor(
    public http: HttpClient,
    public storange: StorangeService
  ){}


  findByEmail(email: string) : Observable<ClienteDTO> {

    return this.http.get<ClienteDTO>(
      `${API_CONFIG.baseUrl}/clientes/email?email=${email}`
    )
  }

  getImageFromBucket(id: string): Observable<any> {
    let url = `${API_CONFIG.baseBucket}/cp${id}.jpg`

    return this.http.get(url, {responseType: 'blob'})
  }
}