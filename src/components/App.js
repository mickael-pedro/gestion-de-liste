import React, { Component } from "react";
import '../assets/App.css';
import TaskList from './TaskList';
import { connect } from "react-redux";
import TaskActionButton from "./TaskActionButton";
import TextField from "@mui/material/TextField";

class App extends Component {
  state = {
    field: "",
  };

  handleInputChange = e => {
    this.setState({
        field: e.target.value,
    })
  };

  render() {
    const { lists } = this.props;
    localStorage.setItem("todos", JSON.stringify(lists));
    const filteredLists = lists.filter((list) => {
      if (this.state.field === '') {
        return lists;
      } else {
        return list.title.toLowerCase().includes(this.state.field.toLowerCase());
      }
    })

    return (
      <div style={{height: "100vh"}}>
        <div style={styles.titleContainer}>
          <h2>Système de gestion de listes</h2>
          <TextField
            value={this.state.field}
            variant="filled"
            label="Rechercher"
            size="small"
            onChange={this.handleInputChange}
            style={styles.searchBar}
          />
        </div>
        <div style={styles.listContainer}>
        { filteredLists.map(list => (
            <TaskList 
              listID={list.id}
              key={list.id}
              title={list.title}
              cards={list.cards}
            />
          ))}
          <TaskActionButton list />
        </div>
      </div>
    );
  }
}

const styles = {
  titleContainer : {
    display: "flex",
    alignItems: "center",
    backgroundColor : "#1d3456",
    padding: "8px 8px 8px 16px",
    marginBottom: "20px",
    boxShadow: "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
    color: "#eee",
  },
  listContainer: {
    display: "flex",
    overflow: "scroll",
    minHeight: "85%",
    flexDirection: "row",
    margin: "-10px 13px",
    padding: "10px 3px",
  },
  searchBar: {
    backgroundColor: "white",
    marginLeft: "30px",
    borderRadius: "5px"
  }
}

const mapStateToProps = state => ({
  lists: state.lists
});

export default connect(mapStateToProps) (App);
