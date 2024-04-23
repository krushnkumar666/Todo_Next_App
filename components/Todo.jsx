import React, { useState } from 'react';

const Todo = ({ todo, editing, deleteTodo, markAsDone, editTodo, updateTodo }) => {
  const { id, title: initialTitle, description: initialDescription, status } = todo;
  const [editedTodo, setEditedTodo] = useState({ title: initialTitle, description: initialDescription });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTodo((prevTodo) => ({ ...prevTodo, [name]: value }));
  };

  const handleUpdate = () => {
    updateTodo(id, editedTodo); 
  };

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {id}
      </th>
      <td className="px-6 py-4">
        {editing ? (
          <input
            type="text"
            name="title"
            value={editedTodo.title}
            onChange={handleChange}
            className="px-3 py-2 border-2 w-full"
          />
        ) : (
          initialTitle
        )}
      </td>
      <td className="px-6 py-4">
        {editing ? (
          <textarea
            name="description"
            value={editedTodo.description}
            onChange={handleChange}
            className="px-3 py-2 border-2 w-full"
          />
        ) : (
          initialDescription
        )}
      </td>
      <td className="px-6 py-4">{status}</td>
      <td className="px-6 py-4 flex gap-1">
        <button onClick={() => deleteTodo(id)} className='py-2 px-4 bg-red-500 text-white'>Delete</button>
        <button onClick={() => markAsDone(id)} className='py-2 px-4 bg-green-500 text-white'>Done</button>
        {editing ? (
          <button onClick={handleUpdate} className='py-2 px-4 bg-blue-500 text-white'>Update</button>
        ) : (
          <button onClick={() => editTodo(id)} className='py-2 px-4 bg-blue-500 text-white'>Edit</button>
        )}
      </td>
    </tr>
  );
};

export default Todo;
