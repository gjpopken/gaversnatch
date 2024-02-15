import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchItems(action) {
    const response = yield axios.get('/api/items')
    yield put({type: "SET_ITEMS", payload: response.data})
}

function* fetchItemsSaga() {
    yield takeLatest('FETCH_ITEMS', fetchItems);
}

export default fetchItemsSaga;