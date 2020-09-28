import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Card } from "react-bootstrap";

const GROUP_MEMBERS = [
  {
    name: "Shrivu Shankar",
    gitlab: "sshh12",
    role: "Full Stack Developer",
    bio: "Junior Computer Science Major from Houston, TX",
    unitTests: 0,
  },
  {
    name: "Cameron Doggett",
    gitlab: "camd99",
    role: "Back-end Developer",
    bio: "Junior Computer Science Major from Katy, TX",
    unitTests: 0,
  },
  {
    name: "Yash Kakodkar",
    gitlab: "YashKakodkar",
    role: "Full Stack Developer",
    bio: "Junior Computer Science Major from Katy, TX",
    unitTests: 0,
  },
  {
    name: "Jeffrey Moulckers",
    gitlab: "jrmoulckers",
    role: "Full Stack Developer",
    bio: "Junior Computer Science/Spanish Dual Major from Austin, TX",
    unitTests: 0,
  },
  {
    name: "Vassi Gianitsos",
    gitlab: "vassi_gianitsos",
    role: "Front-end Developer",
    bio: "Senior Computer Science major from Flower Mound, TX",
    unitTests: 0,
  },
].sort((a, b) => Math.random() - 0.5);

export default class About extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> About Page </h1>
          <LinkContainer className="App-link" to="/">
            <Button variant="outline-secondary">
              Click here to go back to the main page
            </Button>
          </LinkContainer>
        </header>
        <div>
          {GROUP_MEMBERS.map((person) => (
            <Card style={{ width: "18rem", display: "inline-block" }}>
              <Card.Img variant="top" src={`/imgs/${person.gitlab}.jpg`} />
              <Card.Body>
                <Card.Title>{person.name}</Card.Title>
                <Card.Text>
                  {person.bio}
                  <hr />
                  <b>Role</b> {person.role}
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    );
  }
}
