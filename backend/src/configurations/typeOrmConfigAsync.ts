import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { config } from "dotenv";

config();

const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
    return {
      type: "postgres",
      host: configService.get("DATABASE_HOST"),
      port: configService.get("DATABASE_PORT"),
      username: configService.get("DATABASE_USER"),
      password: configService.get("DATABASE_PASSWORD"),
      database: configService.get("DATABASE_NAME"),
      entities: ["dist/**/*.entity{.ts,.js}"],
      logging: true,
      synchronize: false,
      migrationsTableName: "migrations",
      migrations: ["dist/migrations/*{.ts,.js}"],
      autoLoadEntities: false,

      extra: {
        charset: "utf8mb4_unicode_ci",
      },
    };
  },
};
export default typeOrmAsyncConfig;
