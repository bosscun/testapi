/* tslint:disable */

declare var Object: any;
export interface NewsInterface {
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class News implements NewsInterface {
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: NewsInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `News`.
   */
  public static getModelName() {
    return "News";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of News for dynamic purposes.
  **/
  public static factory(data: NewsInterface): News{
    return new News(data);
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
      name: 'News',
      plural: 'News',
      path: 'News',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date'
        },
      },
      relations: {
      }
    }
  }
}
