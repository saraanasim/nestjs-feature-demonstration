import { AbstractEntity } from "src/common/entities/abstract.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Listing extends AbstractEntity<Listing>{

    @Column()
    description:string

    @Column()
    rating:number

}