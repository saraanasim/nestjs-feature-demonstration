import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm'

@Module({
    imports:[
        TypeOrmModule.forRootAsync({
            useFactory:(configService:ConfigService)=>({
                type:'postgres',
                host:configService.getOrThrow('POSTGRES_HOST'),
                database:configService.getOrThrow('POSTGRES_DB'),
                username:configService.getOrThrow('POSTGRES_USER'),
                password:configService.getOrThrow('POSTGRES_PASSWORD'),
                port:configService.getOrThrow('POSTGRES_PORT'),
                autoLoadEntities:true,
                synchronize:configService.getOrThrow('POSTGRES_SYNC')

            }),
            inject:[ConfigService]
        })
    ]
})
export class DatabaseModule {}
