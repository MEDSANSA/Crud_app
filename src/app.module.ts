import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose'; 
import { UserModule } from './user/user.module';


@Module({
  imports: [UserModule, MongooseModule.forRoot('mongodb+srv://azizsansa4:MsO49aUX44PjGAF2@cluster0.cxxca2v.mongodb.net/')],//import database
  controllers: [],
  providers: [],
})
export class AppModule {}
