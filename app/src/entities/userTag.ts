import {Entity, Column, PrimaryGeneratedColumn, Index} from "typeorm"

@Entity()
@Index(["tagId", "userId"])
export class UserTag {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    tagId: number

    @Column({
        length: 32,
    })
    userId: string
}