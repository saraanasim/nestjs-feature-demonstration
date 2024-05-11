import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateCommentDto } from './create-comment.dto';
import { CreateItemDto } from './create-item.dto';

export class UpdateItemDto extends PartialType(CreateItemDto) {

    @ValidateNested({each:true})
    @Type(()=>CreateCommentDto)
    comments:CreateCommentDto[]
}
