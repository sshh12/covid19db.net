import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Card } from "react-bootstrap";

const REPO_ID = "21269899";
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
  constructor(props) {
    super(props);
    this.state = { issues: [], commits: [] };
  }

  componentDidMount() {
    fetch(`https://gitlab.com/api/v4/projects/${REPO_ID}/issues`)
      .then((resp) => resp.json())
      .then((issues) => this.setState({ issues: issues }));
    fetch(`https://gitlab.com/api/v4/projects/${REPO_ID}/repository/commits`)
      .then((resp) => resp.json())
      .then((commits) => this.setState({ commits: commits }));
  }

  render() {
    let { issues, commits } = this.state;
    console.log(issues, commits);
    return (
      <div className="App">
        <header className="App-header" style={{ minHeight: "10rem" }}>
          <h1> About Page </h1>
          <LinkContainer className="App-link" to="/">
            <Button variant="outline-secondary">
              Click here to go back to the main page
            </Button>
          </LinkContainer>
        </header>
        <div>
          {GROUP_MEMBERS.map((person) => {
            let personIssues = issues.filter((issue) =>
              issue.assignees.find(
                (assignee) => assignee.username == person.gitlab
              )
            );
            let personCommits = commits.filter(
              (commit) => commit.author_name == person.name
            );
            return (
              <Card
                key={person.name}
                style={{
                  margin: "10px",
                  width: "22rem",
                  display: "inline-block",
                }}
              >
                <Card.Img variant="top" src={`/imgs/${person.gitlab}.jpg`} />
                <Card.Body>
                  <Card.Title>{person.name}</Card.Title>
                  <Card.Text>
                    {person.bio}
                    <hr />
                    <b>Role</b> {person.role}
                    <hr />
                    <b>Commits</b> {personCommits.length} | <b>Issues</b>{" "}
                    {personIssues.length} | <b>Unit Tests</b> {person.unitTests}
                  </Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }
}
