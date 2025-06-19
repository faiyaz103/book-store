import { Type } from "class-transformer";
import { IsUUID, ValidateNested } from "class-validator";
import { UpdateBookDto } from "./update-book.dto";

export class UpdateWrapperDto{

    @IsUUID()
    id:string;

    @ValidateNested()
    @Type(()=>UpdateBookDto)
    data:UpdateBookDto;
}