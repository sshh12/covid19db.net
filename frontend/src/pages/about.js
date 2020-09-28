import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Card, Media, Tab, Row, Col, ListGroup } from "react-bootstrap";

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

const TOOLS = [
  {
    name: "React",
    url: "https://reactjs.org/",
    desc: "For creating interactive UIs in JSX.",
  },
  {
    name: "Flask",
    url: "https://flask.palletsprojects.com/en/1.1.x/",
    desc: "For serving our API data in a RESTful way.",
  },
];

const DATA_SOURCES = [
  "https://api.covid19api.com/",
  "https://restcountries.eu/",
  "https://newsapi.org/",
  "https://covid.ourworldindata.org/data/owid-covid-data.json",
];

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
    let totalUnitTests = GROUP_MEMBERS.reduce(
      (acc, person) => acc + person.unitTests,
      0
    );
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
        <div style={{ marginTop: "18px", paddingBottom: "18px" }}>
          description of the site, its purpose, its intended users and
          explanation of the interesting result of integrating disparate data
        </div>
        <hr />
        <ProjectInfo />
        <hr />
        <div style={{ marginTop: "18px", paddingBottom: "18px" }}>
          <h4>GitLab Statistics</h4>
          <b>Commits</b> {commits.length} | <b>Issues</b> {issues.length} |{" "}
          <b>Unit Tests</b> {totalUnitTests}
          <br />
          <a href="https://gitlab.com/jrmoulckers/covid19db-net">
            gitlab.com/jrmoulckers/covid19db-net
          </a>
        </div>
        <hr />
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

function ProjectInfo() {
  return (
    <div style={{ margin: "18px" }}>
      <h4>Project Info</h4>
      <br />
      <Tab.Container defaultActiveKey="#tools">
        <Row>
          <Col sm={4}>
            <ListGroup>
              <ListGroup.Item action href="#tools">
                Tools
              </ListGroup.Item>
              <ListGroup.Item action href="#data">
                Data
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col sm={8}>
            <Tab.Content>
              <Tab.Pane eventKey="#tools" style={{ textAlign: "left" }}>
                <ul className="list-unstyled">
                  {TOOLS.map((tool) => (
                    <li>
                      <a href={tool.url}>{tool.name}</a> - {tool.desc}
                    </li>
                  ))}
                </ul>
              </Tab.Pane>
              <Tab.Pane eventKey="#data" style={{ textAlign: "left" }}>
                For the first phase, we downloaded a few local copies of the
                data provided from these sources and glued them into the
                instances using either a script or by copy-paste. The COVID-19
                API, RestCountries, and NewsAPI all provided APIs to access
                their data, but the OWID dataset is only available in file
                format (<code>.json</code> in this case).
                <ul className="list-unstyled">
                  {DATA_SOURCES.map((url) => (
                    <li>
                      <a href={url}>{url}</a>
                    </li>
                  ))}
                </ul>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}
