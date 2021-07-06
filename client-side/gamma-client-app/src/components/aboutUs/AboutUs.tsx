import { Card, ListGroup } from "react-bootstrap";
import '../aboutUs/aboutUs.css';

export const AboutUs: React.FC = () => {
  return (
    <>
      <div id="aboutUsContainer" className="about-section paddingTB60">
        <div className="container">
          <div className="row">
            <div className="col-md-7 col-sm-6">
              <div className="about-title clearfix">
                <h1>About <span className="greenCodesText">Green Codes</span></h1>
                <p>Green Codes is a blog about web programming.</p>
                <p>This blog was created using Node.js, React.js and Typescript</p>

              </div>
              <div className="d-flex flex-md-row flex-sm-row justify-content-center about-icons">

                <div> <a href="https://www.xing.com/profile/SaidRoohullah_Allem/cv"><i id="social-xing" className="fa fa-xing-square fa-3x social"></i></a> </div>
                <div><a href="https://github.com/jahanalem"><i id="social-github" className="fa fa-github-square fa-3x social"></i></a> </div>
                <div><a href="https://www.linkedin.com/in/said-roohullah-allem-934657202/"><i id="social-linkedin" className="fa fa-linkedin-square fa-3x social"></i></a> </div>
                <div> <a href="mailto:s.r.alem19@gmail.com"><i id="social-em" className="fa fa-envelope-square fa-3x social"></i></a> </div>

              </div>
              <div className="about-img">
                <Card style={{ width: '100%' }}>
                  <Card.Header>Teck Stack</Card.Header>
                  <ListGroup variant="flush">
                    <ListGroup.Item>ReactJS (frontend) with Typescript</ListGroup.Item>
                    <ListGroup.Item>ExpressJS (backend) with Typescript</ListGroup.Item>
                    <ListGroup.Item>PrismaJS (as ORM)</ListGroup.Item>
                    <ListGroup.Item>MobX (as state management)</ListGroup.Item>
                    <ListGroup.Item>Axios (Promise based HTTP client for the browser and node.js)</ListGroup.Item>
                  </ListGroup>
                </Card>
              </div>
            </div>
            <div className="col-md-5 col-sm-6">
              <img className="roohullahPhoto mt-3 rounded" src="/images/personal photos/Said Roohullah Allem.jpg" alt="Said Roohullah Allem" />

              <div className="about-img">
                <p>Hi, my name is Said Roohullah Allem, and I am a Fullstack webapplication developer.</p>
                <p>
                  I am very interested in learning and using C#, .NET Core, EntityFramework, Javascript, NodeJS, React and PrismaJS.
                </p>
                <p>
                  Also I will never forget the joy of coding with <a href="https://en.wikipedia.org/wiki/QBasic" rel="noreferrer" target="_blank">QBasic</a> as the first language I learned.
                </p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}