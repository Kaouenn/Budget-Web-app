import React from "react";
import axios from "axios";
class Form extends React.Component {
  state = {
    users: [],
    expenses: [],
    isLoading: true,
    name: "",
    description: "",
    amount: "",
    selectedId: "",
    valueId: "",
    error: null
  };

  handleChange = event => {
    const value = event.target.value;
    this.setState({ [event.target.name]: value });
  };

  handleSubmit = async event => {
    event.preventDefault();

    try {
      if (this.state.selectedId.length !== 0) {
        await axios.post(
          "https://certification-back.herokuapp.com/expense/create",
          {
            user: this.state.selectedId,
            description: this.state.description,
            amount: this.state.amount
          }
        );
        this.setState({
          name: "",
          description: "",
          amount: "",
          selectedId: ""
        });
        await this.getData();
      } else {
        await axios.post(
          "https://certification-back.herokuapp.com/user/create",
          {
            name: this.state.name
          }
        );
        await this.getData();
        this.state.users.map(user => {
          if (this.state.name.toLocaleLowerCase() === user.name) {
            axios.post(
              "https://certification-back.herokuapp.com/expense/create",
              {
                user: user._id,
                description: this.state.description,
                amount: this.state.amount
              }
            );
          }
        });
        this.setState({ name: "", description: "", amount: "" });
        await this.getData();
      }
    } catch (error) {
      console.log(error.message);
      this.setState({ error: error });
    }
  };

  render = () => {
    return (
      <div className="allcontain-form">
        <form onSubmit={this.handleSubmit}>
          <h2 className="title">New expense</h2>

          <select
            className="form-line"
            name="selectedId"
            onChange={this.handleChange}
          >
            <option value="">New User</option>

            {this.state.users.map(user => {
              return (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              );
            })}
          </select>

          {this.state.selectedId.length !== 0 ? null : (
            <input
              className="form-line"
              type="text"
              name="name"
              placeholder="Name"
              maxLength="15"
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
          )}

          <input
            className="form-line"
            type="text"
            name="description"
            placeholder="Description"
            maxLength="25"
            value={this.state.description}
            onChange={this.handleChange}
            required
          />

          <input
            className="form-line"
            type="number"
            step="any"
            name="amount"
            placeholder="Amount"
            min="0"
            value={this.state.amount}
            onChange={this.handleChange}
            required
          />

          <button className="button-form" type="submit">
            ADD EXPENSE
          </button>

          {/* Si le mail/pass est invalide on affiche l'erreur */}
          {this.state.error && <p>{this.state.error.message}</p>}
        </form>
      </div>
    );
  };

  componentDidMount = () => {
    this.getData();
  };

  getData = async () => {
    const responseUser = await axios.get(
      "https://certification-back.herokuapp.com/user"
    );
    const responseExpenses = await axios.get(
      "https://certification-back.herokuapp.com/expense"
    );
    this.setState({
      users: responseUser.data,
      expenses: responseExpenses.data,
      isLoading: false
    });

    await this.props.setUsersLength(responseUser.data);
    await this.props.setExpenses(responseExpenses.data);
  };
}

export default Form;
