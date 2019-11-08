import React, { Component } from 'react';
import axios from 'axios';

export default class AddTreasure extends Component {
  constructor() {
    super();
    this.state = {
      treasureUrl: '',
    };
  }

  handleInput(e) {
    this.setState({ treasureUrl: e.target.value });
  }

  addTreasure() {
    // post to /api/treasure/user here
    axios
      .post("/api/treasure/user", this.state)
      .then(res => {
        this.props.addMyTreasure(res.data)
        this.setState({ treasureUrl: "" })
      })
      .catch(error => alert(error.response.request.respons))
  }

  render() {
    return (
      <div className="addTreasure">
        <input
          type="text"
          placeholder="Add image URL"
          onChange={e => this.handleInput(e)}
          value={this.state.treasureUrl}
        />
        <button onClick={() => this.addTreasure()}>Add</button>
      </div>
    );
  }
}
