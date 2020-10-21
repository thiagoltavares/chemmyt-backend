import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: number;

  @Column()
  name: string;

  @Column('timestamp with time zone')
  expiration: Date;

  @Column()
  batch: string;
}

export default Product;
