/* tslint:disable */
import {
  Message
} from '../index';

declare var Object: any;
export interface ConversationInterface {
  "name"?: string;
  "status"?: boolean;
  "id"?: number;
  messages?: Message[];
}

export class Conversation implements ConversationInterface {
  "name": string;
  "status": boolean;
  "id": number;
  messages: Message[];
  constructor(data?: ConversationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Conversation`.
   */
  public static getModelName() {
    return "Conversation";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Conversation for dynamic purposes.
  **/
  public static factory(data: ConversationInterface): Conversation{
    return new Conversation(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Conversation',
      plural: 'Conversations',
      path: 'Conversations',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "status": {
          name: 'status',
          type: 'boolean'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
        messages: {
          name: 'messages',
          type: 'Message[]',
          model: 'Message',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'conversationId'
        },
      }
    }
  }
}
