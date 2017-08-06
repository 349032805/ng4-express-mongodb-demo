import * as express from 'express';

import UserCtrl from './controllers/user';
import SongCtrl from './controllers/song';

export default function setRoutes(app) {

  const router = express.Router();

  const userCtrl = new UserCtrl();
  const songCtrl = new SongCtrl();

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/register').post(userCtrl.insert);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  router.route('/getSongs').get(songCtrl.getAll);
  router.route('/addSong').post(songCtrl.insert);
  router.route('/getSongDetail/:id').get(songCtrl.get);
  router.route('/deleteSong/:id').delete(songCtrl.delete);
  router.route('/updateSong/:id').put(songCtrl.update);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
