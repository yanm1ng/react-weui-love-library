import AV from 'leancloud-storage';
import APP from '../config/index';

AV.init({
  appId: APP.appId,
  appKey: APP.appKey
});

export function getBookList() {

  let query = new AV.Query('Book');
  return query.find();
}

export function borrowBook(id) {
  let book = AV.Object.createWithoutData('Book', id);
  book.fetch().then(function(){
    let num = book.get('num');
    book.set('num', num - 1);
    book.save();
  }, function (error) {
    // 异常处理
  });
}