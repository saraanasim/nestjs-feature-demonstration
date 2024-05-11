import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateListingDto{
    @IsNotEmpty()
    @IsString()
    description:string

    @IsNotEmpty()
    @IsNumber()
    rating:number
}