import * as _ from 'lodash';
import { App, PersistedModelStatic } from '../../common/helpers/loopback';

module.exports = function (app: App) {
  const withoutId = (it: any) => Object.assign({}, it, { id: undefined });

  const automigrate = (dataSource: string) => (model: string) => {
    return new Promise<PersistedModelStatic<any>>((resolve, reject) => {
      app.dataSources[dataSource].automigrate(model, function (err: Error) {
        if (err) {
          return reject(err);
        }
        resolve(app.models[model]);
      });
    });
  };

  const autoupdate = (dataSource: string) => (model: string) => {
    return new Promise<PersistedModelStatic<any>>((resolve, reject) => {
      app.dataSources[dataSource].autoupdate(model, function (err: Error) {
        if (err) {
          return reject(err);
        }
        resolve(app.models[model]);
      });
    });
  };

  (async () => {
    const [
      Account,
      AccountToken,
      ACL,
      RoleMapping,
      Role,
      Category,
      Product,
      News

    ] = await Promise.all([
      'Account',
      'AccountToken',
      'ACL',
      'RoleMapping',
      'Role',
      'Category',
      'Product',
      'News'
    ].map(_.includes(['production', 'staging'], process.env.NODE_ENV)
      ? autoupdate('db')
      : automigrate('db')));

    const application = {
      id: 'link.bfast.colvemat',
      userId: 'linktohack',
      name: 'COLVEMAT',
      description: 'COLVEMAT Application',
      pushSettings: {
        apns: {
          token: {
            keyId: '8CN5C97W3N',
            key: './server/credentials/AuthKey_8CN5C97W3N.p8',
            teamId: 'P8VHHC5UZQ'
          },
          bundle: 'link.bfast.colvemat',
          production: false       // (process.env.NODE_ENV === 'production')
        },
        gcm: {
          serverApiKey: 'AAAAqGawg3s:APA91bFVmljvusyt-bb4ZcjuCGoAYekbUyAl1sidHMCBNTPDbmXGQaOVxNwDpJ3qQ25eruZ6xpdWaJBhxidx4LFPJ_tIAPiCHsIuvdMkGEmMth3ixd9KREWBaPwOLIWB2m9-Acp6pOo0'
        }
      }
    };

    if (process.env.NODE_ENV === 'production') {
      return;
    }

  })().catch(
    e => {
      console.error('Error seeding!', e);
    }
  );
};
