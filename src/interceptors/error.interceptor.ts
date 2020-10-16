import { Injectable } from '@angular/core'
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS} from '@angular/common/http'
import { Observable } from 'rxjs/Rx'
import { StorangeService } from '../services/storage.service'
import { AlertController } from 'ionic-angular'
import { FieldMessage } from '../models/fieldmessage'


@Injectable()
export class Errorinterceptor implements HttpInterceptor {

  constructor(
    public storage: StorangeService,
    public alertCTRL: AlertController
  ){}

  intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
    return next.handle(req)
      .catch((error, caught) => {
        let errorObj = error
        if(errorObj.error){
          errorObj = errorObj.error
        }
        if(!errorObj.status){
          errorObj = JSON.parse(errorObj)
        }

        console.log('Erro detectado pelo interceptor')
        console.log(errorObj)

        switch(errorObj.status) {
          case 401:
            console.log('Passou no erro 401')
            this.handle401()
            break
          case 403:
            this.handle403()
            break

          case 422:
            this.handle422(errorObj)
            break

          default:
            this.handleDefaultError(errorObj)
        }
        return Observable.throw(errorObj)
      }) as any
  }

  handle403() {
    this.storage.setLocalUser(null)
  }

  handle401(){
    let alert = this.alertCTRL.create({
      title: 'Erro 401: falha de autenticação',
      message: 'Email ou senha incorretos',
      enableBackdropDismiss: false,
      buttons:[
        { text: 'ok' }
      ]
    })

    alert.present()
  }

  handle422(erroObj) {
    let alert = this.alertCTRL.create({
      title: 'Erro 422: Validação',
      message: this.listErros(erroObj.errors),
      enableBackdropDismiss: false,
      buttons:[
        { text: 'ok' }
      ]
    })

    alert.present()
  }

  listErros(messages: FieldMessage[]): string {
    let s : string = ''
    for (var i=0; i<messages.length; i++) {
      s = s + '<p><strong>'
            + messages[i].fieldName
            + ' </strong> '
            + messages[i].message
            + '</p>'
    }

    return s
  }

  handleDefaultError(erroObj){
    let alert = this.alertCTRL.create({
      title: 'Erro ' + erroObj.status + ': ' + erroObj.erro,
      message: erroObj.message,
      enableBackdropDismiss: false,
      buttons:[
        { text: 'ok' }
      ]
    })

    alert.present()
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: Errorinterceptor,
  multi: true,
}
