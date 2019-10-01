import React from "react";

class Expenses extends React.Component {
  // on garde un state pour chaque input

  renderExpenses = () => {
    const formatter = new Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    let total = 0;
    this.props.expensesRefresh.forEach(expense => {
      total = total + expense.amount;
    });

    return (
      <div className="expenses-tab">
        <h2 className="title">Expenses</h2>
        <div className="section">
          <div className="user-title">
            <h3>User</h3>
          </div>
          <div className="description-amount-title">
            <h3>Description</h3>
            <h3>Amount</h3>
          </div>
        </div>
        <div className="expenses-map">
          {this.props.expensesRefresh.map(expense => (
            <div key={expense._id} className="entire-line">
              <div className="entire-line-user">
                <h4 className="user" key={expense.user._id}>
                  {expense.user.name}
                </h4>
              </div>
              <div className="entire-line-description-amount">
                <p className="description">{expense.description}</p>
                <p className="amount">{formatter.format(expense.amount)}€</p>
              </div>
            </div>
          ))}
        </div>
        <div className="total-expenses">
          <h2>Total</h2>
          <p>{formatter.format(total)}€</p>
        </div>
      </div>
    );
  };

  render = () => {
    return <div className="allcontain-expenses">{this.renderExpenses()}</div>;
  };
}

export default Expenses;
