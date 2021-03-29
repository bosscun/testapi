"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
module.exports = function (app) {
    const withoutId = (it) => Object.assign({}, it, { id: undefined });
    const automigrate = (dataSource) => (model) => {
        return new Promise((resolve, reject) => {
            app.dataSources[dataSource].automigrate(model, function (err) {
                if (err) {
                    return reject(err);
                }
                resolve(app.models[model]);
            });
        });
    };
    const autoupdate = (dataSource) => (model) => {
        return new Promise((resolve, reject) => {
            app.dataSources[dataSource].autoupdate(model, function (err) {
                if (err) {
                    return reject(err);
                }
                resolve(app.models[model]);
            });
        });
    };
    (async () => {
        const [Account, AccountToken, ACL, RoleMapping, Role, Category, Product, News] = await Promise.all([
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
                    production: false // (process.env.NODE_ENV === 'production')
                },
                gcm: {
                    serverApiKey: 'AAAAqGawg3s:APA91bFVmljvusyt-bb4ZcjuCGoAYekbUyAl1sidHMCBNTPDbmXGQaOVxNwDpJ3qQ25eruZ6xpdWaJBhxidx4LFPJ_tIAPiCHsIuvdMkGEmMth3ixd9KREWBaPwOLIWB2m9-Acp6pOo0'
                }
            }
        };
        if (process.env.NODE_ENV === 'production') {
            return;
        }
    })().catch(e => {
        console.error('Error seeding!', e);
    });
};
//# sourceMappingURL=seed.js.map