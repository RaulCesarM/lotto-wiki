import { Observable } from 'rxjs';
import { CorrelationsRepository } from '../data/repositories/correlationsRepository';

export class CorrelService {

  constructor(private correlationsRepository: CorrelationsRepository) { }

  getFroRepo(): Observable<number[][]> {
    return this.correlationsRepository.getData();
  }
}
