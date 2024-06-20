import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";



export class CustomInterceptor implements NestInterceptor{
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

      console.log('request gets intercepted here')
      console.log({context})


      return next.handle().pipe(
        map(data=> {
          console.log('response is intercepted here')
          console.log(data)

          const response= {
            ...data,
            createdAt: data.created_at
          }

          delete response.created_at
          delete response.updated_at

          return response
        })
      )
  }
}