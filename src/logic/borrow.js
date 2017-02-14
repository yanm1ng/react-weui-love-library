import AV from 'leancloud-storage';
import APP from '../config/index';

AV.init({
  appId: APP.appId,
  appKey: APP.appKey
});

export function addBorrow(data) {

  const Borrow = AV.Object.extend('Borrow');
  const borrow = new Borrow();
  for (let key in data) {
    borrow.set(key, data[key]);
  }
  
  return borrow;
}