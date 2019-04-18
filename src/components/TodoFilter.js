import React from 'react';

export default function TodoFilter({ list, count, filter, nowShowing, onClick }) {
    if(!list.length) {
      return null;
    }
    return (
      <div className="todo-filter">
        <span className="todo-filter__count">
          <span className="todo-filter__num">
            {count}
          </span>
          <span className="todo-filter__text">
            {count === 1 ? 'item left' : 'items left'}
          </span>
        </span>
        <ul className="todo-filter__list">
          <li className="todo-filter__item">
            <button 
              onClick={filter} 
              value="All" 
              className={nowShowing === 'All' ? 'active' : ''}
            >
              All
            </button>
          </li>
          <li className="todo-filter__item">
            <button 
              onClick={filter} 
              value="Active"
              className={nowShowing === 'Active' ? 'active' : ''}
            >
              Active
            </button>
          </li>
          <li className="todo-filter__item">
            <button 
              onClick={filter} 
              value="Completed"
              className={nowShowing === 'Completed' ? 'active' : ''}
            >
              Completed
            </button>
          </li>
        </ul>
        { list.length > count &&
          <button className="todo-filter__clear" onClick={onClick}>Clear completed</button>
        }
      </div>
    );
  }