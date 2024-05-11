import { IsBoolean, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { CreateListingDto } from "./create-listing.dto";
import { Type } from "class-transformer";

export class CreateItemDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsBoolean()
    public: boolean;

    @ValidateNested()
    @Type(()=>CreateListingDto)
    listing:CreateListingDto
  }