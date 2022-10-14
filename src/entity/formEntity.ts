import {
    Column, Entity, JoinColumn, OneToOne,
} from 'typeorm';
import { CommonFields } from './commonFields';
import { User } from './userEntyti';
import { config } from '../config';

@Entity({ name: 'Forms', database: config.MYSQL_DATABASE_NAME })
export class Forms extends CommonFields {
    @Column({
        type: 'int',
        nullable: false,
    })
        userId: number;

    @Column({
        type: 'datetime',
        nullable: false,
    })
        date: Date;

    @Column({
        type: 'int',
        nullable: false,
    })
        status: number;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        fullName: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        fullTimePosition: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        partTimePosition: string;

    @Column({
        type: 'boolean',
        nullable: false,
    })
        isAbroadTrip: boolean;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        purpose: string;

    @Column({
        type: 'int',
        nullable: false,
    })
        retentionType: number;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        city: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        country: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        institution: string;

    @Column({
        type: 'date',
        nullable: false,
    })
        startDate: Date;

    @Column({
        type: 'date',
        nullable: false,
    })
        endDate: Date;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        route: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        transport: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        expensesPayment: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        tripReason: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
        user: User;
}
