import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('providers')
class Provider {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  complement: string;

  @Column()
  cnpj: string;

  @Column()
  cpf: string;

  @Column()
  city: string;

  @Column()
  cep: string;

  @Column()
  nameLocale: string;

  @Column()
  noteLocale: string;

  @Column()
  neighborhood: string;

  @Column()
  number: string;

  @Column()
  uf: string;

  @Column()
  street: string;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}

export default Provider;
