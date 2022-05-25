import {  } from '../../domain/usecases/add-request-items'
import { ItemsModel } from '../../domain/models/request-items'

export interface UpdateRequestItemsTopicRepository {
  updateItem (itemsModel: ItemsModel[]): Promise<void>
}
