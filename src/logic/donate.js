import AV from 'leancloud-storage';
import APP from '../config/index';

AV.init({
  appId: APP.appId,
  appKey: APP.appKey
});

export function addDonate(data) {

  const Donate = AV.Object.extend('Donate');
  const donate = new Donate();
  for (let key in data) {
    donate.set(key, data[key]);
  }
  
  return donate;
}