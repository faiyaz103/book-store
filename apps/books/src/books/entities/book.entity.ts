import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({name:'books'})
export class Book {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type:'varchar', length:300, nullable:false})
    bookName:string;

    @Column({type:'varchar', length:200, nullable:false})
    authorName:string;

    @Column({type:'int', nullable:false})
    quantity:number;

    @CreateDateColumn({type:'timestamptz', default:()=>'CURRENT_TIMESTAMP'})
    createdAt:Date;

    @UpdateDateColumn({type:'timestamptz', default:()=>'CURRENT_TIMESTAMP'})
    updatedAt:Date;

}
