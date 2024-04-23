"use client"
import Todo from "@/components/Todo";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });
  const [editingTodoId, setEditingTodoId] = useState(null); 

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    try {
     
      setTodos((prevTodos) => [
        ...prevTodos,
        { id: prevTodos.length + 1, ...formData, status: "Pending" }
      ]);
      
      setFormData({ title: "", description: "" });
      toast.success('Todo added successfully');
    } catch (error) {
      toast.error("Error adding todo");
    }
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    toast.success('Todo deleted successfully');
  };

  const markAsDone = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, status: "Done" } : todo
      )
    );
    toast.success('Todo marked as Done');
  };

  const editTodo = (id) => {
    setEditingTodoId(id); 
  };

  const updateTodo = (id, updatedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...updatedTodo } : todo))
    );
    setEditingTodoId(null); 
    toast.success('Todo updated successfully');
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={onSubmitHandler} className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto ">
        <input value={formData.title} onChange={onChangeHandler} type="text" name="title" placeholder="Enter Title" className="px-3 py-2 border-2 w-full" />
        <textarea value={formData.description} onChange={onChangeHandler} name="description" placeholder="Enter Description" className="px-3 py-2 border-2 w-full"></textarea>
        <button type="submit" className="bg-orange-600 py-3 px-11 text-white rounded-md">Add</button>
      </form>

      <div className="relative overflow-x-auto mt-20 w-[60%] mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                editing={editingTodoId === todo.id} 
                deleteTodo={deleteTodo}
                markAsDone={markAsDone}
                editTodo={editTodo}
                updateTodo={updateTodo}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
