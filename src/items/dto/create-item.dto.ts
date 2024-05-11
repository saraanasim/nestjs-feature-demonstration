import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { CreateListingDto } from "./create-listing.dto";

export class CreateItemDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsBoolean()
    public: boolean;

    @ValidateNested()
    @Type(() => CreateListingDto)
    listing: CreateListingDto
  }