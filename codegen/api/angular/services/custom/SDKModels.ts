/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Message } from '../../models/Message';
import { Product } from '../../models/Product';
import { News } from '../../models/News';
import { Category } from '../../models/Category';
import { Account } from '../../models/Account';
import { AccountToken } from '../../models/AccountToken';
import { Conversation } from '../../models/Conversation';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    Message: Message,
    Product: Product,
    News: News,
    Category: Category,
    Account: Account,
    AccountToken: AccountToken,
    Conversation: Conversation,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
