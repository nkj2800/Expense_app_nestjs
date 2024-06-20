import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor // the class is instanciated and is used as the provider.
      // this class is an interceptor provided by nestjs that transforms/serializes response objects based on decorators(@Expose, @Exclude)
    }
  ],
})
export class AppModule {}
