import React, { Component } from 'react';

export default class TodoList extends Component {
    constructor(props) {
      super(props);
  
      this.editInput = React.createRef();
    }
  
    componentDidUpdate() {
      if(this.props.list.length && this.editInput.current) {
        this.editInput.current.focus();
      }
    }

    createTodoItems = () => {
      const {
        list, 
        onChange, 
        onDoubleClick, 
        onClick, 
        onSubmit, 
        onBlur, 
        onChangeEdit
      } = this.props;
      
      return list.map((item) =>
        <li key={item.id} className="todo-list__item">
          <div className="todo-list__checkbox">
            <input 
              type="checkbox" 
              checked={item.completed}
              id={item.id}
              onChange={() => onChange(item.id)}
            />
            <label htmlFor={item.id}></label>
          </div>
          <span 
            className={"todo-list__description " + (item.completed ? "todo-list__description_completed" : '')}
            onDoubleClick={() => onDoubleClick(item.id)}
          >
            {item.value}
          </span>
          <button className="todo-list__destroy" onClick={() => onClick(item.id)}>Del</button>
          {
            item.editFlag &&
            <form 
              className={"todo-edit-form"}
              onSubmit={(e) => onSubmit(item.id, e)}
            >
              <input 
                defaultValue={item.value}
                onBlur={(e) => onBlur(item.id, e)}
                onChange={(e) => onChangeEdit(item.id, e)}
                ref={this.editInput}
              />
            </form>
          }
        </li>
      );
    }
  
    render() {
      return (
        <ul className="todo-list">
          {this.createTodoItems()}
        </ul>
      );
    }
  }