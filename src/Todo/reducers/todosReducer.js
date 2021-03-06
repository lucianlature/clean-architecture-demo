//@flow

"use strict";

import { ADD, ADD_ALL, REMOVE } from "../actions/todoActions";
import type { AddPayload, RemovePayload } from "../actions/todoActions";
import { create } from "../models/TodoModel";
import type { TodoModel } from "../models/TodoModel";
import { add, addAll, remove, empty } from "../models/TodoCollection";
import type { TodoCollection } from "../models/TodoCollection";


const initialState = empty();

const todo = (state: ?TodoModel, action: ReduxAction<AddPayload>) => {
  switch (action.type) {
    case ADD:
      return create(action.payload);
    default:
      return state;
  }
};

const todos = (state: TodoCollection = initialState, action: ReduxAction<AddPayload | RemovePayload>) => {
  switch (action.type) {
    case ADD:
      return add(state, todo(undefined, action));
    case ADD_ALL: {
      const { payload: { todos } } = action;
      return addAll(state, todos.map(create));
    }
    
    case REMOVE:
      return remove(state, action.payload.id);
    default:
      return state;
  }
};

export default todos;
