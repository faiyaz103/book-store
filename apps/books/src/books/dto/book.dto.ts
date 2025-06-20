import { IsInt, IsNotEmpty, IsString, IsUUID, MaxLength, Min } from "class-validator";


export class BookDto {

    @IsUUID()
    id:string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(300)
    bookName:string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    authorName:string;

    @IsInt()
    @Min(0)
    quantity:number;
}
