import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import { DataSource } from "typeorm";

const configService = new ConfigService();
config();
export default new DataSource({
  type: "postgres",
  host: configService.get("DATABASE_HOST"),
  port: configService.get("DATABASE_PORT"),
  username: configService.get("DATABASE_USER"),
  password: configService.get("DATABASE_PASSWORD"),
  database: configService.get("DATABASE_NAME"),
  entities: ["src/**/*.entity.{ts,js}"],
  synchronize: false,
  migrationsTableName: "migrations",
  migrations: ["dist/migrations/*{.ts,.js}"],
  // migrations: ['dist/src/migrations/*{.ts,.js}'],

  extra: {
    charset: "utf8mb4_unicode_ci",
  },
});
