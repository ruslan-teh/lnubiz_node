import { Column, Entity } from 'typeorm';
import { CommonFields } from './commonFields';
import { config } from '../config';

@Entity({ name: 'Admin', database: config.MYSQL_DATABASE_NAME })
export class Admin extends CommonFields {
    @Column({
        name: 'userId',
        type: 'int',
        nullable: false,
    })
        userId: number;

    @Column({
        name: 'admin',
        type: 'boolean',
    })
        admin: boolean;
}
