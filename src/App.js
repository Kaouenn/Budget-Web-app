import React from "react";
import Form from "./Form";
import Expenses from "./Expenses";
import Users from "./Users";
import "./index.css";

class App extends React.Component {
  state = {
    usersLength: [],
    expensesRefresh: []
  };

  setUsersLength = usersLength => {
    this.setState({ usersLength });
  };

  setExpenses = expensesRefresh => {
    this.setState({ expensesRefresh });
  };

  render = () => {
    const ComponentsCommonProps = {
      usersLength: this.state.usersLength,
      setUsersLength: this.setUsersLength,
      expensesRefresh: this.state.expensesRefresh,
      setExpenses: this.setExpenses
    };
    return (
      <div>
        {this.state.usersLength.length === 0 ? (
          <div className="contain-app">
            <Form {...ComponentsCommonProps} />
          </div>
        ) : (
          <div className="contain-app">
            <Users {...ComponentsCommonProps} />
            <Expenses {...ComponentsCommonProps} />
            <Form {...ComponentsCommonProps} />
          </div>
        )}
   <div className="made">
          Made with <span className="heart">♥</span> in React
        </div>
      </div>
    );
  };
}

export default App;
