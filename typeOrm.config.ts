import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import { join } from "path";
import { DataSource } from "typeorm";

config();

const configService=new ConfigService()

export default new DataSource({
    type:'postgres',
    host:configService.getOrThrow('POSTGRES_HOST'),
    database:configService.getOrThrow('POSTGRES_DB'),
    username:configService.getOrThrow('POSTGRES_USER'),
    password:configService.getOrThrow('POSTGRES_PASSWORD'),
    port:configService.getOrThrow('POSTGRES_PORT'),
    entities:[
        join(__dirname, 'items/entities/*.entity.ts') // Use relative paths with __dirname
    ],
    migrations:['migrations/**']
})