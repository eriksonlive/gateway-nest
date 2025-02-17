import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsBoolean, IsNumber, IsPositive, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Optional } from '@nestjs/common';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
