import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* addToInventory(action) {
    try {
        const response = yield axios.post(`/api/items/inventory/${action.payload.storyId}`, action.payload.items)
    } catch (error) {
        console.log(error);
    }
}

function* addInventorySaga() {
    yield takeLatest('ADD_TO_INVENTORY', addToInventory);
}

export default addInventorySaga;