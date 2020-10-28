import React from 'react';

const App = () => {
  // useState returns an array of two elements: the first is the variable, the second the set function for the variable.
  const [newTodo, setNewTodo] = React.useState('');
  const [toDos, setToDos] = React.useState([]);
  // This function will only be recreated when the dependencies change.
  const onNewTodoChange = React.useCallback((event) =>{
    setNewTodo(event.target.value)
  }, []);

  const formSubmitted = React.useCallback((event) => {
    event.preventDefault();
    //not empty
    if(!newTodo.trim()) return;
    setToDos([
      {
        id: toDos.length ? toDos[0].id +1 : 1,
        content: newTodo,
        done: false,
      },
      ...toDos
    ])
    setNewTodo('');
  }, [newTodo, toDos]);

  const addTodo = React.useCallback((todo, index) => (event) => {
    const newTodos = [...toDos];
    newTodos.splice(index,1,{
      ...todo,
      done: !todo.done
    });
    setToDos(newTodos);
  }, [toDos]);

  const removeTodo = React.useCallback((todo) => (event) => {
    setToDos(toDos.filter(otherTodo => otherTodo !== todo));
  },[toDos])

  const markAllDone = React.useCallback( () => {
    const updatedTodos = toDos.map(todo => {
      return{
        ...todo,
        done: true,
      };
    });
    setToDos(updatedTodos);
  }, [toDos]);

  return (
    <div>
      <form onSubmit={formSubmitted}>
        <label htmlFor="newTodo">Enter a ToDo:</label>
        <input
          id="newTodo"
          name="newTodo"
          value={newTodo}
          onChange={onNewTodoChange}
        />
        <button>Add ToDo</button>
      </form>
      <button onClick={markAllDone}>Mark All Done</button>
      <ul>
        {toDos.map( (todo, index) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={addTodo(todo, index)}
            />
            <span className={todo.done ? 'done' : ''}>{todo.content}</span>
            <button onClick={removeTodo(todo)}>Remove ToDo</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

