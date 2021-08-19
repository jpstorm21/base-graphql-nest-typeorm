import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ name: 'rut', type: 'text', nullable: true })
    rut: string

    @Column({ name: 'name', type: 'text', nullable: true })
    name: string

    @Column({ name: 'email', type: 'text', nullable: true })
    email: string
    
    @Column({ name: 'password', type: 'text', nullable: true })
    password: string

    @Column({ name: 'password_salt', type: 'text', nullable: true })
    passwordSalt: string

    @Column({ name: 'phone', type: 'text', nullable: true })
    phone: string

    @Column({ name: 'state', type: 'boolean', nullable: true })
    state: boolean

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: 'NOW' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
    deletedAt: Date
}