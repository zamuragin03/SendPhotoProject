import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import typeOrmAsyncConfig from "./configurations/typeOrmConfigAsync";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserModule } from "./user/user.module";
import { ProfileTypeModule } from "./profile-type/profile-type.module";
import { PaymentModule } from "./payment/payment.module";
import { WithdrawModule } from "./withdraw/withdraw.module";
import { FileModule } from "./file/file.module";
import { FolderModule } from "./folder/folder.module";
import { TransactionModule } from "./transaction/transaction.module";
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    UserModule,
    ProfileTypeModule,
    PaymentModule,
    WithdrawModule,
    FileModule,
    FolderModule,
    TransactionModule,
    AuthModule,
  ],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
