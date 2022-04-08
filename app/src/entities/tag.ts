import {Entity, Column, PrimaryGeneratedColumn, Index} from "typeorm"

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id: number

    @Index()
    @Column({
        length: 100,
    })
    name: string
}