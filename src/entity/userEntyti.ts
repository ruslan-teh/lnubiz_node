import {
    Column, Entity,
} from 'typeorm';
import { CommonFields } from './commonFields';
import { config } from '../config';

@Entity({ name: 'Users', database: config.MYSQL_DATABASE_NAME })
export class User extends CommonFields {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        firstName: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        lastName: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
        unique: true,
    })
        email: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        password: string;
}
