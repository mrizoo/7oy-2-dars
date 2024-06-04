import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo, changeStateTodo, allDelete } from "./todoSlice";
import toast from "react-hot-toast";
function App() {
  let inputRef = useRef();
  let dispetch = useDispatch();
  let { todos } = useSelector((store) => store.todoSate);
  let handlSubmit = (e) => {
    e.preventDefault();
    let newObj = {
      text: inputRef.current.value,
      chek: false,
    };

    if (inputRef.current.value.trim()) {
      dispetch(addTodo(newObj));
      toast.success("To Do is add");
      inputRef.current.value = "";
    } else {
      toast.error("Edit To Do");
    }
  };

  return (
    <div className="flex items-center justify-center flex-col h-full ">
      <form onSubmit={handlSubmit} className="lg:ml-16">
        <label className="flex  mb-3 ml-1 lg:w-96 w-full md:w-72 justify-between">
          <input
            type="text"
            ref={inputRef}
            placeholder="Add new To Do"
            className="input input-bordered w-full max-w-xs"
          />
          <button className="btn btn-circle">add</button>
        </label>
      </form>
      <ul className="flex flex-col gap-2 w-full max-w-xs">
        {todos &&
          todos.map((todo, id) => {
            return (
              <li
                key={id}
                className={`flex items-center justify-between border p-2 gap-5 rounded-xl  lg:w-96 bg-white  ${
                  todo.chek ? "opacity-50" : "opacity-100"
                }`}
              >
                <button
                  onClick={() => {
                    dispetch(changeStateTodo(id));
                  }}
                  className="btn btn-info"
                >
                  Chek
                </button>
                <h3 className="  text-left ">
                  {/* <textarea
                    type="text"
                    className="input input-bordered border-none w-full max-w-xs"
                    defaultValue={todo.text}
                    ref={textArea}
                  />{" "}
                  <button
                    onClick={() => {
                      dispetch(editeTodo(todo.text));
                      console.log(edit);
                      console.log(textArea.current.value);
                    }}
                  >
                    {" "}
                    ✏{" "}
                  </button> */}
                  {todo.text}
                </h3>
                <button
                  onClick={() => {
                    dispetch(removeTodo(id));
                    toast.error("This is To Do delete");
                  }}
                  className="btn btn-circle"
                >
                  ✖
                </button>
              </li>
            );
          })}
      </ul>
      <p className="flex justify-end items-end lg:ml-16 -ml-8 w-96">
        <button
          className="link-info bg-white p-1 rounded-xl mt-2"
          onClick={() => {
            dispetch(allDelete());
          }}
        >
          All delete
        </button>
      </p>
    </div>
  );
}

export default App;
