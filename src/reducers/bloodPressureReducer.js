export const DEVICE_IS_PAIRED = 'DEVICE_IS_PAIRED';
export const NEW_BLOOD_PRESSURE_READING = 'NEW_BLOOD_PRESSURE_READING';
export const NEW_BLOOD_PRESSURE_SYNC = 'NEW_BLOOD_PRESSURE_SYNC';
export const SYNC_COMPLETE = 'SYNC_COMPLETE';

const initialState = {
  bloodPressureReadings: [],
  isPaired: false,
  device: {},
  currentSync: {},
};

export default function bloodPressureReducer(state = initialState, action) {
  console.log('bloodPressureReducer', state, action);
  switch (action.type) {
    case DEVICE_IS_PAIRED:
      return {...state, isPaired: true, device: action.payload};
    case NEW_BLOOD_PRESSURE_SYNC:
      return {
        ...state,
        currentSync: {
          syncInfo: action.payload,
          data: [],
        },
      };

    case SYNC_COMPLETE:
      return {
        ...state,
        currentSync: {},
        bloodPressureReadings: [
          ...state.bloodPressureReadings,
          state.currentSync,
        ],
      };
    case NEW_BLOOD_PRESSURE_READING:
      return {
        ...state,
        currentSync: {
          ...state.currentSync,
          data: [...state.currentSync.data, action.payload],
        },
      };

    default:
      return state;
  }
}
