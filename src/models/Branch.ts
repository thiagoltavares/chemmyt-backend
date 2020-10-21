import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('branches')
class Branch {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  cnpj: string;
}

export default Branch;
