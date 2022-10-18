import {
    Column, Entity, JoinColumn, OneToOne,
} from 'typeorm';
import { CommonFields } from './commonFields';
import { User } from './userEntyti';
import { actionTokenEnum, config } from '../config';

@Entity({ name: 'ActionTokens', database: config.MYSQL_DATABASE_NAME })
export class ActionTokenEntity extends CommonFields {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        actionToken: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        type: actionTokenEnum;

    @Column({
        type: 'int',
        nullable: false,
    })
        userId: number;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
        user: User;
}
