import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { PrismaModule } from '../prisma/prisma.module';
// import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { NotFoundException } from '@nestjs/common';

describe('ProductService', () => {
  let service: ProductService;
  let prismaService: PrismaService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [ProductService],
    }).compile();

    service = module.get<ProductService>(ProductService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('Should return a object and valid properties after create a product', async () => {
  //   const products: CreateProductDto = {
  //     title: 'product 1',
  //     description: 'Products description',
  //     stock: 100,
  //     price: 120,
  //   };
  //   const result = await service.createProduct(
  //     products,
  //     'dec2df5a-4a40-4860-9165-832a3f87258b',
  //   );
  //   expect(result).toBeDefined();
  //   expect(result).toHaveProperty('status');
  //   expect(result).toHaveProperty('message');
  //   expect(result).toHaveProperty('data');
  //   expect(result.data).toHaveProperty('id');
  // });
  it('Should have a valid values', async () => {
    // const products: CreateProductDto = {
    //   title: 'product 1',
    //   description: 'Products description',
    //   stock: 100,
    //   price: 120,
    // };
    // const result = await service.createProduct(
    //   products,
    //   'dec2df5a-4a40-4860-9165-832a3f87258b',
    // );
    // expect(result.status).toEqual('success');
    // expect(result.message).toEqual('Product created successfully');
    // expect(result.data).toBeDefined();
  });

  test('Should return valid a next URL', () => {
    service.setProtocolAndIP({ protocol: 'http', ip: '192.0.0.1' });
    const nextURL = service.getNextURL(50, 1, 100);
    expect(nextURL).toBe('http://192.0.0.1:3000/products?limit=50&page=2');
  });
  test('Next URL should return a null', () => {
    service.setProtocolAndIP({ protocol: 'http', ip: '192.0.0.1' });
    const nextURL = service.getNextURL(10, 100, 100);
    expect(nextURL).toBeNull();
  });

  test('Should return a valid previous URL', () => {
    service.setProtocolAndIP({ protocol: 'http', ip: '192.0.0.1' });
    const nextURL = service.getPreviousURL(50, 2);
    expect(nextURL).toBe('http://192.0.0.1:3000/products?limit=50&page=1');
  });
  test('Previous URL should return a null', () => {
    service.setProtocolAndIP({ protocol: 'http', ip: '192.0.0.1' });
    const prevURL = service.getPreviousURL(50, 1);
    expect(prevURL).toBeNull();
  });

  test('Total products items is 3', async () => {
    const products = await service.getProducts(3, 1);
    expect(products.data.items.length).toBe(3);
  });
  test('All properties should defined', async () => {
    const products = await service.getProducts(3, 1);
    expect(products.status).toBeDefined();
    expect(products.message).toBeDefined();
    expect(products.data).toBeDefined();
    expect(products.data.currentPage).toBeDefined();
    expect(products.data.items).toBeDefined();
    expect(products.data.limit).toBeDefined();
    expect(products.data.next).toBeDefined();
    expect(products.data.prev).toBeDefined();
    expect(products.data.currentPage).toBeDefined();
    expect(products.data.totalProducts).toBeDefined();
  });
  test('Items should have valid values', async () => {
    const products = await prismaService.product.findMany({
      take: 3,
    });
    const mapped = service.mapProducts(products);
    const result = await service.getProducts(3, 1);
    expect(result.data.items).toEqual(mapped);
  });

  test('Should return valid next url on data object response', async () => {
    service.setProtocolAndIP({ protocol: 'http', ip: '192.0.0.1' });
    const result = await service.getProducts(3, 1);
    expect(result.data.next).toBe(
      'http://192.0.0.1:3000/products?limit=3&page=2',
    );
  });
  test('Should return valid previous url on data object response', async () => {
    service.setProtocolAndIP({ protocol: 'http', ip: '192.0.0.1' });
    const result = await service.getProducts(3, 2);
    expect(result.data.prev).toBe(
      'http://192.0.0.1:3000/products?limit=3&page=1',
    );
  });
  test('next url at data object response should null', async () => {
    service.setProtocolAndIP({ protocol: 'http', ip: '192.0.0.1' });
    const totalProducts = await prismaService.product.count();
    const result = await service.getProducts(3, totalProducts);
    expect(result.data.next).toBeNull();
  });
  test('previous url at data object response should null', async () => {
    service.setProtocolAndIP({ protocol: 'http', ip: '192.0.0.1' });
    const result = await service.getProducts(3, 1);
    expect(result.data.prev).toBeNull();
  });

  test('Should instance of BadRequestException', async () => {
    const dto: UpdateProductDto = {
      title: 'MAS',
      description: 'MAS DESC',
      price: 201,
      stock: 200,
    };
    try {
      await service.updateProduct('ddedex', dto, 'ased');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  test('Data should updated', async () => {
    const ID_PRODUCT = '002ba806-b053-4fd4-9542-d917738d8b25';
    const ID_USER = 'dec2df5a-4a40-4860-9165-832a3f87258b';
    const dto: UpdateProductDto = {
      title: 'Kondom bocor',
      description: 'Kondom bocor yang telah digunakan oleh cewek sexy',
      price: 150,
      stock: 12,
    };
    const result = await service.updateProduct(ID_PRODUCT, dto, ID_USER);
    expect(result.data.items.title).toBe(dto.title);
    expect(result.data.items.description).toBe(dto.description);
    expect(result.data.items.price).toBe(dto.price);
    expect(result.data.items.stock).toBe(dto.stock);
  });
});
