import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IErrorInProcessing, defaultValue } from 'app/shared/model/error-in-processing.model';

export const ACTION_TYPES = {
  FETCH_ERRORINPROCESSING_LIST: 'errorInProcessing/FETCH_ERRORINPROCESSING_LIST',
  FETCH_ERRORINPROCESSING: 'errorInProcessing/FETCH_ERRORINPROCESSING',
  CREATE_ERRORINPROCESSING: 'errorInProcessing/CREATE_ERRORINPROCESSING',
  UPDATE_ERRORINPROCESSING: 'errorInProcessing/UPDATE_ERRORINPROCESSING',
  DELETE_ERRORINPROCESSING: 'errorInProcessing/DELETE_ERRORINPROCESSING',
  RESET: 'errorInProcessing/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IErrorInProcessing>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ErrorInProcessingState = Readonly<typeof initialState>;

// Reducer

export default (state: ErrorInProcessingState = initialState, action): ErrorInProcessingState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ERRORINPROCESSING_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ERRORINPROCESSING):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ERRORINPROCESSING):
    case REQUEST(ACTION_TYPES.UPDATE_ERRORINPROCESSING):
    case REQUEST(ACTION_TYPES.DELETE_ERRORINPROCESSING):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ERRORINPROCESSING_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ERRORINPROCESSING):
    case FAILURE(ACTION_TYPES.CREATE_ERRORINPROCESSING):
    case FAILURE(ACTION_TYPES.UPDATE_ERRORINPROCESSING):
    case FAILURE(ACTION_TYPES.DELETE_ERRORINPROCESSING):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ERRORINPROCESSING_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ERRORINPROCESSING):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ERRORINPROCESSING):
    case SUCCESS(ACTION_TYPES.UPDATE_ERRORINPROCESSING):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ERRORINPROCESSING):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/error-in-processings';

// Actions

export const getEntities: ICrudGetAllAction<IErrorInProcessing> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_ERRORINPROCESSING_LIST,
    payload: axios.get<IErrorInProcessing>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IErrorInProcessing> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ERRORINPROCESSING,
    payload: axios.get<IErrorInProcessing>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IErrorInProcessing> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ERRORINPROCESSING,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IErrorInProcessing> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ERRORINPROCESSING,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IErrorInProcessing> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ERRORINPROCESSING,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
