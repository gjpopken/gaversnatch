import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchItems(action) {
    const results = yield axios.get('/api/items')
}

function* fetchItemsSaga() {
    yield takeLatest('FETCH_ITEMS', fetchItems);
}

export default fetchItemsSaga;