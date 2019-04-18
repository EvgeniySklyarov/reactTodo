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
      return this.props.list.map((item) =>
        <li key={item.id} className="todo-list__item">
          <div className="todo-list__checkbox">
            <input 
              type="checkbox" 
              checked={item.completed}
              id={item.id}
              onChange={() => this.props.onChange(item.id)}
            />
            <label htmlFor={item.id}></label>
          </div>
          <span 
            className={"todo-list__description " + (item.completed ? "todo-list__description_completed" : '')}
            onDoubleClick={() => this.props.onDoubleClick(item.id)}
          >
            {item.value}
          </span>
          <button className="todo-list__destroy" onClick={() => this.props.onClick(item.id)}>Del</button>
          {
            item.editFlag &&
            <form 
              className={"todo-edit-form"}
              onSubmit={(e) => this.props.onSubmit(item.id, e)}
            >
              <input 
                defaultValue={item.value}
                onBlur={(e) => this.props.onBlur(item.id, e)}
                onChange={(e) => this.props.onChangeEdit(item.id, e)}
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