import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class UserConfiguration {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: string;

    @Column()
    key: string;

    @Column()
    replacement: string;
}
