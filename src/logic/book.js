import AV from 'leancloud-storage';
import APP from '../config/index';

AV.init({
	appId: APP.appId,
	appKey: APP.appKey
});

export function getBookList() {
	var query = new AV.Query('Book');
	return query.find();
}