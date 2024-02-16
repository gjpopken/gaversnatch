import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* addToInventory(action) {
    try {
        const response = yield axios.post(`/api/items/inventory/${action.payload.storyId}`, action.payload.items)
        yield put({type: "FETCH_INVENTORY", payload: action.payload.storyId})
    } catch (error) {
        console.log(error);
    }
}

function* fetchInventory(action) {
    const response = yield axios.get(`/api/items/inventory/${action.payload}`)
    yield put({type: "SET_INVENTORY", payload: response.data})
}



function* addInventorySaga() {
    yield takeLatest('ADD_TO_INVENTORY', addToInventory);
    yield takeLatest("FETCH_INVENTORY", fetchInventory)
}

export default addInventorySaga;