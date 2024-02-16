import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* updateSave(action) {
  console.log("MOVESAVEOBJ: ", action.payload.move);
  console.log("STORYID", action.payload.storyId);
  try {
    yield axios.put(`api/advtext/${action.payload.storyId}`, action.payload.move)
    yield put({type: "GET_SAVEOBJ", payload: action.payload.storyId})
  } catch (error) {
    console.log(error);
  }
}

function* getSaveObj(action) {
    try {
        const saveObj = yield axios.get(`/api/advtext/${action.payload}`)
        yield put({ type: "SET_SAVEOBJ", payload: saveObj.data.history })
    } catch (error) {
        console.log(error);
        yield put({type: "SET_SAVEOBJ", payload: {adventure_text: [{creator: "comp", content:"You're not supposed to be here."}]}})
    }
}

function* saveObjSaga() {
    yield takeLatest('UPDATE_SAVE', updateSave);
    yield takeLatest("GET_SAVEOBJ", getSaveObj)
}

export default saveObjSaga;
