import { Column, Entity } from 'typeorm';
import { CommonFields } from './commonFields';

@Entity({ name: 'Admin', database: 'lnubiz' })
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
