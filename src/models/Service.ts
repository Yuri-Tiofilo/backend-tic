import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  // ManyToOne,
  // JoinColumn,
} from 'typeorm';

// import Provider from './Provider';

@Entity('services')
class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  note: string;

  @Column()
  value: string;

  @Column()
  duration: string;

  @Column()
  provider_id: string;

  // @ManyToOne(() => Provider)
  // @JoinColumn({ name: 'provider_id' })
  // provider: Provider;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}

export default Service;
