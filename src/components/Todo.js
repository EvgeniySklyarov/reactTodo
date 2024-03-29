import React, { Component } from 'react';
import TodoAdd from './TodoAdd';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';

class Todo extends Component {
  state = {
    todoList: [],
    value: '',
    nowShowing: 'All',
    allChecked: false
  };

  handleSubmit = (e) => {
    const newTodo = {
      value: this.state.value,
      completed: false,
      id: Date.now(),
      editFlag: false
    }

    if (this.state.value.trim()) {
      this.setState({
        todoList: [...this.state.todoList, newTodo],
        value: ''
      });
    }

    e.preventDefault();
    this.checkAllMark();
  }

  handleChangeInput = (e) => this.setState({ value: e.currentTarget.value });

  handleChecked = (id) => {
    this.setState(state => {
      const currentItem = this.searchCurrentItem(state, id);
      currentItem.completed = !currentItem.completed;

      return {
        currentItem
      }
    });
    this.checkAllMark();
  }

  deleteTodo = (id) => {
    this.setState(state => {
      const currentItemIndex = state.todoList.findIndex(item => item.id === id);
      const newList = state.todoList.splice(currentItemIndex, 1);
      return {
        newList
      }
    });
    this.checkAllMark();
  }

  clearCompleted = () => {
    this.setState(state => {
      const newList = state.todoList.filter(item => !item.completed);
      return {
        todoList: newList
      }
    });
    this.checkAllMark();
  }

  filterTodo = (e) => {
    this.setState({
      nowShowing: e.target.value
    })
  }

  markAll = (e) => {
    this.setState({
      allChecked: e.target.checked
    });
    this.setState(state => state.todoList.forEach(item => {
      item.completed = state.allChecked
    }))
  }

  countInProgress = () => {
    let count = 0;
    if (this.state.todoList.length) {
      this.state.todoList.forEach(item => {
        if (!item.completed) {
          count += 1;
          return count;
        }
      });
    }
    return count;
  }

  searchCurrentItem = (state, id) => {
    const currentItemIndex = state.todoList.findIndex(item => item.id === id);
    const currentItem = state.todoList[currentItemIndex];
    return currentItem;
  }

  editTodoItem = (id) => {
    this.setState(state => {
      const currentItem = this.searchCurrentItem(state, id);
      currentItem.editFlag = true;
      return {
        currentItem
      }
    });
  }

  handleSubmitEditTodo = (id, e) => {
    e.preventDefault();
    this.handleBlurEditTodo(id);
  }

  handleChangeEditTodo = (id, e) => {
    const currentItem = this.searchCurrentItem(this.state, id);
    const newValue = e.currentTarget.value;
    currentItem.value = newValue;
    this.setState({ currentItem });
  }

  handleBlurEditTodo = (id) => {
    const currentItem = this.searchCurrentItem(this.state, id);
    if (!currentItem.value.trim()) {
      this.deleteTodo(id);
    } else {
      currentItem.editFlag = false;
      this.setState({ currentItem });
    }
  }

  checkAllMark() {
    this.setState(state => {
      const allMark = state.todoList.every(item => item.completed);
      return {
        allChecked: allMark
      }
    });
  }

  filteredTodos() {
    if (this.state.nowShowing === 'All') return this.state.todoList;
    if (this.state.nowShowing === 'Active') return this.state.todoList.filter((element) => !element.completed);
    if (this.state.nowShowing === 'Completed') return this.state.todoList.filter((element) => element.completed);
  }

  render() {
    return (
      <div className="todo">
        <h1 className="todo__title">todos</h1>
        <div className="todo__wrapper">
          <TodoAdd
            onSubmit={this.handleSubmit}
            value={this.state.value}
            onChange={this.handleChangeInput}
            list={this.state.todoList.length}
            markAll={this.markAll}
            checked={this.state.allChecked}
          />
          <TodoList
            list={this.filteredTodos()}
            onChange={this.handleChecked}
            onClick={this.deleteTodo}
            onDoubleClick={this.editTodoItem}
            onSubmit={this.handleSubmitEditTodo}
            onChangeEdit={this.handleChangeEditTodo}
            onBlur={this.handleBlurEditTodo}
          />
          <TodoFilter
            count={this.countInProgress()}
            onClick={this.clearCompleted}
            filter={this.filterTodo}
            list={this.state.todoList}
            nowShowing={this.state.nowShowing}
          />
        </div>
      </div>
    );
  }
}

export default Todo;
