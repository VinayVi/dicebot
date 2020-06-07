import {Entity, Column, PrimaryGeneratedColumn, Unique} from "typeorm";

@Entity()
@Unique("userconfiguration_userid_key", ["userId", "key"])
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
