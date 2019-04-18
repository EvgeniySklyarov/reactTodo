import React from 'react';

export default function TodoAdd({ onSubmit, list, markAll, checked, value, onChange }) {
    return (
      <form className="todo-form" onSubmit={onSubmit}>
        {list > 0 &&
          <>
            <input 
              type="checkbox" 
              id="mark-all" 
              onChange={markAll}
              checked={checked}
            />
            <label className="todo-form__mark-all" htmlFor="mark-all"></label>
          </>
        }
        <input 
          className="todo-form__fields"
          type="text" 
          placeholder="What needs to be done?" 
          value={value}
          onChange={onChange}
          autoFocus
        />
      </form>
    );
  }