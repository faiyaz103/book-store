import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from "class-validator";

export class BookResponseDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(300)
    bookName:string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    authorName:string;

}
