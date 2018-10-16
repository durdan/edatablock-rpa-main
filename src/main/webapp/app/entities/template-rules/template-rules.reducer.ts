import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITemplateRules, defaultValue } from 'app/shared/model/template-rules.model';

export const ACTION_TYPES = {
  FETCH_TEMPLATERULES_LIST: 'templateRules/FETCH_TEMPLATERULES_LIST',
  FETCH_TEMPLATERULES: 'templateRules/FETCH_TEMPLATERULES',
  CREATE_TEMPLATERULES: 'templateRules/CREATE_TEMPLATERULES',
  UPDATE_TEMPLATERULES: 'templateRules/UPDATE_TEMPLATERULES',
  DELETE_TEMPLATERULES: 'templateRules/DELETE_TEMPLATERULES',
  RESET: 'templateRules/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITemplateRules>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type TemplateRulesState = Readonly<typeof initialState>;

// Reducer

export default (state: TemplateRulesState = initialState, action): TemplateRulesState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TEMPLATERULES_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TEMPLATERULES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TEMPLATERULES):
    case REQUEST(ACTION_TYPES.UPDATE_TEMPLATERULES):
    case REQUEST(ACTION_TYPES.DELETE_TEMPLATERULES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TEMPLATERULES_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TEMPLATERULES):
    case FAILURE(ACTION_TYPES.CREATE_TEMPLATERULES):
    case FAILURE(ACTION_TYPES.UPDATE_TEMPLATERULES):
    case FAILURE(ACTION_TYPES.DELETE_TEMPLATERULES):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TEMPLATERULES_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TEMPLATERULES):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TEMPLATERULES):
    case SUCCESS(ACTION_TYPES.UPDATE_TEMPLATERULES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TEMPLATERULES):
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

const apiUrl = 'api/template-rules';

// Actions

export const getEntities: ICrudGetAllAction<ITemplateRules> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_TEMPLATERULES_LIST,
    payload: axios.get<ITemplateRules>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ITemplateRules> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TEMPLATERULES,
    payload: axios.get<ITemplateRules>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITemplateRules> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TEMPLATERULES,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITemplateRules> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TEMPLATERULES,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITemplateRules> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TEMPLATERULES,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
