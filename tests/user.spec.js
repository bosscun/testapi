const server = require('loopback')
const userService = require('../common/models/accountservice')
// var CoffeeShopModel = server.models.Message;

test('inint tesst', ()=> {
  // console.log('server', CoffeeShopModel);
  const a = 1;
  expect(a).toEqual(1)
})

test('generate password', ()=> {
  const username ='tantn'
  const  birh = '1992'
  const pass = userService.sendResetPasswordEmail(username, birh)
  expect(pass).toEqual('tantn1992')
})


curl -v --location --request POST 'https://https://api.lescrous.fr/vem/v1/authenticate' \                                   ILW-App-Ionic-v5-gitlab/git/develop
--header 'Content-Type: application/json' \
--data-raw '{
  "env": "PRD",
  "appId": "5-1-9-8-14",
  "appSecret": "nzwZg4sPEZfT7uh8J8Ws"
}'


curl -v --location -POST -H "Content-type: application/json" -d '{
  "idTicketEntete":"140000011",
  "numeroTicket": "210402149",
  "codeEvenement": "VT",
  "date": "2021-04-02T10:55:39.998Z",
  "versionLogiciel": "borne-sco-app-version",
  "listeLignes": [],
  "complementaire": { "codeSocieteClient": 10, "tarifClient": 1, "idLogiciel": 39 }
}' 'https://api.lescrous.fr/vem/v1/5/remontee-caisse/tickets/5/1/9/8/14?use=logica2&versCommandeEnLigne=1'
