import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // This allows your React app (on port 3000/5173) to talk to this API
  app.enableCors(); 
  
  await app.listen(3000); 
  console.log('Backend server running on http://localhost:3000');
}
bootstrap();