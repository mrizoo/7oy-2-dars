import { createSlice } from "@reduxjs/toolkit";

let dataFromLoclaStore = () => {
  return (
    JSON.parse(localStorage.getItem("todos")) || {
      todos: [],
    }
  );
};

export let todoSlice = createSlice({
  name: "Todo",
  initialState: dataFromLoclaStore,
  reducers: {
    addTodo: (state, { payload }) => {
      state.todos.push(payload);
      todoSlice.caseReducers.setLocal(state);
    },
    removeTodo: (state, { payload }) => {
      let filter = state.todos.filter((fillter, id) => {
        return !(id == payload);
      });
      state.todos = filter;
      todoSlice.caseReducers.setLocal(state);
    },
    changeStateTodo: (state, { payload }) => {
      let find = state.todos.find((todo, id) => {
        return id == payload;
      });
      find.chek = !find.chek;
      todoSlice.caseReducers.setLocal(state);
    },
    allDelete: (state, { payload }) => {
      state.todos = [];
      todoSlice.caseReducers.setLocal(state);
    },

    setLocal: (state) => {
      localStorage.setItem("todos", JSON.stringify(state));
    },
  },
});

export let { addTodo, removeTodo, changeStateTodo, allDelete, editeTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
