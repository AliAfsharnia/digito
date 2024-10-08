import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import * as dotenv from 'dotenv';
dotenv.config();

const config: PostgresConnectionOptions = {
    type: 'postgres',
    host: 'localhost',    
    port: 5432,
    username: 'postgres',
    password: '123',    
    database: 'digito',
    entities: [ __dirname +'/**/*.entity{.ts,.js}'],
    synchronize: false,
    migrations: [ __dirname +'/migrations/**/*{.ts,.js}'],
}

export default config;