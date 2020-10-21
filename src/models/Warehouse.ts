import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('warehouses')
class Warehouse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: number;

  @Column()
  name: string;
}

export default Warehouse;
