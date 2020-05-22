import { Injectable } from '@angular/core'
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS} from '@angular/common/http'
import { Observable } from 'rxjs/Rx'
import { StorangeService } from '../services/storage.service'
import { API_CONFIG } from '../config/api.config'


@Injectable()
export class Authinterceptor implements HttpInterceptor {

  constructor(public storage: StorangeService){}

  intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {

    let localUser = this.storage.getLocalUser()

    let N = API_CONFIG.baseUrl.length;
    let requestToAPI = req.url.substring(0, N) == API_CONFIG.baseUrl

    if(localUser && requestToAPI) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)
      })

      return next.handle(authReq)
    }
    return next.handle(req)

  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: Authinterceptor,
  multi: true,
}
