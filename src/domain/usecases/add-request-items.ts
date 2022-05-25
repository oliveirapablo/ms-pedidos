import { ItemsModel, RequestItemsModel } from '../models/request-items'

export interface AddRequestItemsModel {
  documentClient?: string
  items: ItemsModel[]
  amountRequest?: number
}

export interface AddRequestItems {
  add(item: AddRequestItemsModel): Promise<RequestItemsModel>
}