
export abstract class BaseService<
  T
> {

  abstract getById(
    id: number
  ): Promise<T | null>;

  abstract getAll():
    Promise<T[]>;

}
