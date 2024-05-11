import { Type } from "class-transformer"
import { IsNotEmpty, IsString, ValidateNested } from "class-validator"
import { CreateItemDto } from "./create-item.dto"

export class CreateCommentDto {
    @IsNotEmpty()
    @IsString()
    content: string
}