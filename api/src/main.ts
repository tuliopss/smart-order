import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exceptions';
// import { AppModule } from './app.module';
import * as momentTimezone from 'moment-timezone';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());

  Date.prototype.toJSON = () => {
    return momentTimezone(this)
      .tz('America/Sao_Paulo')
      .format('DD-MM-YYYY HH:mm:ss');
  };
  app.enableCors();
  await app.listen(3000, () => console.log('App running'));
}
bootstrap();
