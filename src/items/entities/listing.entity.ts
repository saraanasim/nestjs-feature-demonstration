import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Listing{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    description:string

    @Column()
    rating:number

    constructor(item: Partial<Listing>){
        Object.assign(this,item)
    }

}