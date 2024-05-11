import { AbstractEntity } from "src/common/entities/abstract.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne } from "typeorm";
import { Listing } from "./listing.entity";
import { Comment } from "./comment.entity";
import { Tag } from "./tag.entity";

@Entity()
export class Item extends AbstractEntity<Item>{

    @Column()
    name:string

    @Column({default:true})
    public:boolean

    @OneToOne(()=>Listing,{cascade:true})
    @JoinColumn()
    listing:Listing

    @OneToMany(()=>Comment,(comment)=>comment.item,{cascade:true})
    comments:Comment[]

    @ManyToMany(()=>Tag,{cascade:true})
    @JoinTable()
    tags:Tag[]

}
