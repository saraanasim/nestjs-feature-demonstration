import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { CreateCommentDto } from './create-comment.dto';
import { CreateItemDto } from './create-item.dto';

export class UpdateItemDto extends PartialType(CreateItemDto) {

    @IsOptional()
    @ValidateNested({each:true})
    @Type(()=>CreateCommentDto)
    comments:CreateCommentDto[]
    
    @IsOptional()
    @ValidateNested({each:true})
    @Type(()=>CreateCommentDto)
    tags:CreateCommentDto[]
}
