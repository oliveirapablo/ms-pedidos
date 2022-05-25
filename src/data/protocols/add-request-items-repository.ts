import { AddRequestItemsModel } from '../../domain/usecases/add-request-items'
import { RequestItemsModel } from '../../domain/models/request-items'

export interface AddRequestItemsRepository {
  add (item: AddRequestItemsModel): Promise<RequestItemsModel>
}
