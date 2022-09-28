import {
    Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Users', database: 'lnubiz' })
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
        nullable: true
    })
    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt?: string;
}
