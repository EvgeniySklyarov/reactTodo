import React from 'react';

export default function TodoFilter(props) {
    if(!props.list.length) {
      return null;
    }
    return (
      <div className="todo-filter">
        <span className="todo-filter__count">
          {props.count} {props.count === 1 ? 'item left' : 'items left'}
        </span>
        <ul className="todo-filter__list">
          <li className="todo-filter__item">
            <button onClick={props.filter} value="All" className="active">All</button>
          </li>
          <li className="todo-filter__item">
            <button onClick={props.filter} value="Active">Active</button>
          </li>
          <li className="todo-filter__item">
            <button onClick={props.filter} value="Completed">Completed</button>
          </li>
        </ul>
        { props.list.length > props.count &&
          <button className="todo-filter__clear" onClick={props.onClick}>Clear completed</button>
        }
      </div>
    );
  }