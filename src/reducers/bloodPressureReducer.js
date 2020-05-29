export const DEVICE_IS_PAIRED = 'DEVICE_IS_PAIRED';
export const NEW_BLOOD_PRESSURE_READING = 'NEW_BLOOD_PRESSURE_READING';
export const NEW_BLOOD_PRESSURE_SYNC = 'NEW_BLOOD_PRESSURE_SYNC';
export const SYNC_COMPLETE = 'SYNC_COMPLETE';
export const UNREGISTER_DEVICE = 'UNREGISTER_DEVICE';

const initialState = {
  bloodPressureReadings: [],
  isPaired: false,
  device: {},
  currentSync: {},
  log: [],
};

export default function bloodPressureReducer(state = initialState, action) {
  if (__DEV__) {
    console.log('bloodPressureReducer', state, action);
  }
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
          state.currentSync,
          ...state.bloodPressureReadings,
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
    case UNREGISTER_DEVICE:
      return {
        ...state,
        isPaired: false,
        device: {},
      };
    default:
      return state;
  }
}
