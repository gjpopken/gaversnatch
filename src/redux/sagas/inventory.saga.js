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
    
}



function* addInventorySaga() {
    yield takeLatest('ADD_TO_INVENTORY', addToInventory);
    yield takeLatest("FETCH_INVENTORY", fetchInventory)
}

export default addInventorySaga;