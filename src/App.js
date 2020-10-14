import React, { Component } from "react";

import "./App.css";
import MaterialTable from "material-table";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import { withStyles } from "@material-ui/core/styles";

import { data } from "./data/fakeData";

import { FilterForm, filter } from "./components/filter";

const strOperator = [{ name: "Contains", value: "CONTAINS" }];
const boolOperator = [{ name: "Equals", value: "EQ" }];
const numOperator = [
  { name: ">=", value: "GTE" },
  { name: "<=", value: "LTE" },
];

const columns = [
  { title: "Name", type: "string", field: "name", operator: strOperator },
  { title: "Screen Name", type: "string", field: "screen_name", operator: strOperator },
  { title: "Followers Count", type: "numeric", field: "followers_count", operator: numOperator },
  { title: "Following Count", type: "numeric", field: "following_count", operator: numOperator },
  { title: "Location", type: "string", field: "location", operator: strOperator },
  { title: "Verified", type: "boolean", field: "verified", operator: boolOperator },
];

class App extends Component {
  state = {
    join: "AND",
    conditions: [],
    data: data,
  };

  addFilter = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        conditions: [...prevState.conditions, { id: null, operator: null, value: null }],
      };
    });
  };

  onDelete = (idx) => {
    let conditions = [...this.state.conditions];

    conditions.splice(idx, 1);

    this.setState({ conditions }, this.applyFilter);
  };

  onJoinSelect = (e) => {
    this.setState({
      join: e.target.value,
    });
  };

  onChangeConditionAt = (index, name, value) => {
    let conditions = [...this.state.conditions];

    conditions[index][name] = value;

    this.setState({ conditions });
  };

  applyFilter = () => {
    let filteredData = filter(this.state, data);

    this.setState({ data: filteredData });
  };

  resetFilter = () => {
    this.setState({
      join: "AND",
      conditions: [],
      data: data,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="App">
        <Paper elevation={1} className={classes.root}>
          {this.state.conditions.map((condition, index) => (
            <FilterForm
              key={index}
              join={this.state.join}
              condition={condition}
              onChangeCondition={(name, value) => this.onChangeConditionAt(index, name, value)}
              index={index}
              onDelete={this.onDelete}
              onJoinSelect={this.onJoinSelect}
              columns={columns}
            />
          ))}
          <Button variant="contained" onClick={this.addFilter}>
            + Add Filter
          </Button>
          &nbsp;
          <Button variant="contained" color="primary" onClick={this.applyFilter}>
            Apply Filter
          </Button>
          &nbsp;
          <Button variant="contained" color="secondary" onClick={this.resetFilter}>
            Reset Filter
          </Button>
        </Paper>
        <div className="App-Table">
          <MaterialTable
            title="User Data"
            columns={columns}
            data={this.state.data}
            options={{
              search: false,
              headerStyle: {
                backgroundColor: "#eee",
                color: "#000",
              },
            }}
          />
        </div>
      </div>
    );
  }
}

export default withStyles({
  root: {
    padding: 10,
  },
})(App);
