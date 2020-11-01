import { EntityRepository, Repository } from 'typeorm';
import Movimentation from '../models/Movimentation';

@EntityRepository(Movimentation)
class MovimentationRepository extends Repository<Movimentation> {}

export default MovimentationRepository;
