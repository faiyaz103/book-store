import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from "class-validator";

export class CreateBookDto {

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
