import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, DefaultValuePipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // 1. 상품 생성
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  // 2. 상품 조회
  @Get('/category/:category')
  findCategory(@Param('category', ParseIntPipe) category: number) {
    return this.productService.findCategory(category);
  }
  // 2. 상품 조회
  @Get('/category_cursor/:category')
  findCategoryByCursor(
    @Param('category', ParseIntPipe) category: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take?: number,
    @Query('cursorId', new DefaultValuePipe(0), ParseIntPipe) cursorId?: number
  ) {
    const takeValue = take ? take : 10;
    return this.productService.findCategoryByCursor(category, takeValue, cursorId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getProduct(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }

  //product 좋아요
}
