import React, { Component } from "react";
import { connect } from "react-redux";
import { Todo, fetchTodos, clearTodos, clearSpecifcTodo } from "../actions";
import { StoreState } from "../reducers";

interface AppProps {
  todos: Todo[];
  fetchTodos: Function; //only for Action creators
  clearTodos: Function;
  clearSpecifcTodo: Function;
}

interface AppState {
  fetching: boolean;
}
class _App extends Component<AppProps, AppState> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: AppProps) {
    super(props);

    this.state = {
      fetching: false,
    };
  }

  componentDidUpdate(prevProps: AppProps) {
    if (!prevProps.todos.length && this.props.todos.length) {
      this.setState({ fetching: false });
    }
  }

  onButtonClick = (): void => {
    this.props.clearTodos();
    this.props.fetchTodos();
    this.setState({ fetching: true });
  };

  removeHandler = (e: React.MouseEvent<HTMLElement>): void => {
    const temp = this.props.todos.filter(
      (todo: Todo) => todo.id !== Number((e.target as Element).id)
    );
    this.props.clearSpecifcTodo(temp);
  };

  renderList(): JSX.Element[] {
    return this.props.todos.map((todo: Todo) => {
      return (
        <div key={todo.id} id={String(todo.id)} onClick={this.removeHandler}>
          {todo.title}
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.onButtonClick}>Fetch</button>
        {this.state.fetching ? "Loading...." : null}
        {this.renderList()}
      </div>
    );
  }
}

const mapStateToProps = ({ todos }: StoreState): { todos: Todo[] } => {
  return { todos };
};

export const App = connect(mapStateToProps, {
  fetchTodos,
  clearTodos,
  clearSpecifcTodo,
})(_App);
