import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
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
    let token = this.storange.getLocalUser().token
    let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token})

    return this.http.get<ClienteDTO>(
      `${API_CONFIG.baseUrl}/clientes/email?email=${email}`,
      {'headers': authHeader }
    )
  }

  getImageFromBucket(id: string): Observable<any> {
    let url = `${API_CONFIG.baseBucket}/cp${id}.jpg`

    return this.http.get(url, {responseType: 'blob'})
  }
}
