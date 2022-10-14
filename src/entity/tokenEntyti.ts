import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './userEntyti';
import { CommonFields } from './commonFields';
import { IToken } from '../interfaces';
import { config } from '../config';

@Entity({ name: 'Tokens', database: config.MYSQL_DATABASE_NAME })
export class Token extends CommonFields implements IToken {
    @PrimaryGeneratedColumn({
        type: 'int',
    })
        id: number;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        accessToken: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        refreshToken: string;

    @Column({
        type: 'int',
        nullable: false,
    })
        userId: number;

    @Column({
        nullable: false,
        default: Date.now(),
    })
    @CreateDateColumn({ type: 'timestamp' })
        createdAt: string;

    @Column()
    @DeleteDateColumn({
        type: 'timestamp',
    })
        deletedAt?: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
        user: User;
}
