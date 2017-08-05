import * as express from 'express';

import CatCtrl from './controllers/cat';
import UserCtrl from './controllers/user';
import SongCtrl from './controllers/song';

export default function setRoutes(app) {

  const router = express.Router();

  const userCtrl = new UserCtrl();
  const catCtrl = new CatCtrl();
  const songCtrl = new SongCtrl();


  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/register').post(userCtrl.insert);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  // Cats
  router.route('/cats').get(catCtrl.getAll);
  router.route('/cats/count').get(catCtrl.count);
  router.route('/cat').post(catCtrl.insert);
  router.route('/cat/:id').get(catCtrl.get);
  router.route('/cat/:id').put(catCtrl.update);
  router.route('/cat/:id').delete(catCtrl.delete);

  router.route('/getSongs').get(songCtrl.getAll);
  router.route('/addSong').post(songCtrl.insert);
  router.route('/getSongDetail/:id').get(songCtrl.get);
  router.route('/deleteSong/:id').delete(songCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
