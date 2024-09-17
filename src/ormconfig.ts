import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import * as dotenv from 'dotenv';
dotenv.config();

const config: PostgresConnectionOptions = {
    type: 'postgres',
    host: 'digito',    
    port: 5432,
    username: 'root',
    password: 'TREUDBCqWNQ9zV5LaDxBTmjQ',    
    database: 'digito',
    entities: [ __dirname +'/**/*.entity{.ts,.js}'],
    synchronize: false,
    migrations: [ __dirname +'/migrations/**/*{.ts,.js}'],
}

export default config;