import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("products")
@Controller('product')
export class ProductController {}
