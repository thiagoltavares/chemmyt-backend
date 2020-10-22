import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('warehouses')
class Warehouse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: number;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Warehouse;
