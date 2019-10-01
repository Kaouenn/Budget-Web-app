import React from "react";
// import axios from "axios";
class Users extends React.Component {
  renderTotalPerUser = user_Id => {
    let total = 0;
    this.props.expensesRefresh.forEach(expense => {
      if (expense.user._id === user_Id) {
        total = total + expense.amount;
      }
    });
    return total;
  };

  renderExpenses = () => {
    const formatter = new Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return (
      <div className="expenses-tab">
        <h2 className="title">Users</h2>
        <div className="sectionUser">
          <h3>User</h3>
          <h3 className="sectionUser-expenses">Expenses</h3>
        </div>
        <div className="expenses-map">
          {this.props.usersLength.map(user => (
            <div key={user._id} className="entire-line">
              <h4 className="user" key={user._id}>
                {user.name}
              </h4>
              <p className="amount">
                {formatter.format(this.renderTotalPerUser(user._id))}€
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  render = () => {
    return <div className="allcontain-users">{this.renderExpenses()}</div>;
  };
}

export default Users;
