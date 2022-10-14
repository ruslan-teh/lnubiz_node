import {
    Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn,
} from 'typeorm';

export class CommonFields {
    @PrimaryGeneratedColumn({
        type: 'int',
    })
        id: number;

    @Column({
        nullable: false,
        default: Date.now(),
    })
    @CreateDateColumn({ type: 'timestamp' })
        createdAt: string;

    @Column({
        nullable: true,
    })
    @DeleteDateColumn({ type: 'timestamp' })
        deletedAt?: string;
}
