import React from 'react';

export default function TodoAdd(props) {
    return (
      <form className="todo-form" onSubmit={props.onSubmit}>
        {props.list > 0 &&
          <>
            <input 
              type="checkbox" 
              id="mark-all" 
              onChange={props.markAll}
              checked={props.checked}
            />
            <label className="todo-form__mark-all" htmlFor="mark-all"></label>
          </>
        }
        <input 
          className="todo-form__fields"
          type="text" 
          placeholder="What needs to be done?" 
          value={props.value}
          onChange={props.onChange}
          autoFocus
        />
      </form>
    );
  }