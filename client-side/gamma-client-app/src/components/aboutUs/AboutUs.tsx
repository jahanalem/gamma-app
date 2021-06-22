import { Card, ListGroup } from "react-bootstrap";
import '../aboutUs/aboutUs.css';

export const AboutUs: React.FC = () => {
  return (
    <>
      <div className="about-section paddingTB60">
        <div className="container">
          <div className="row">
            <div className="col-md-7 col-sm-6">
              <div className="about-title clearfix">
                <h1>About <span className="greenCodesText">Blog</span></h1>
                <p>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

                </p>
                <p>
                  Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                </p>
              </div>
              <div className="d-flex flex-md-column flex-sm-row justify-content-center about-icons">

                <div> <a href="https://www.xing.com/profile/SaidRoohullah_Allem/cv"><i id="social-xing" className="fa fa-xing-square fa-3x social"></i></a> </div>
                <div><a href="https://github.com/jahanalem"><i id="social-github" className="fa fa-github-square fa-3x social"></i></a> </div>
                <div><a href="https://www.linkedin.com/in/jahanalem/"><i id="social-linkedin" className="fa fa-linkedin-square fa-3x social"></i></a> </div>
                <div> <a href="mailto:s.r.alem19@gmail.com"><i id="social-em" className="fa fa-envelope-square fa-3x social"></i></a> </div>

              </div>
            </div>
            <div className="col-md-5 col-sm-6">
              <img className="aboutPhoto mt-3 rounded" src="./react.jpeg" alt="" style={{ width: "430px", height: "auto" }} />

              <div className="about-img">
                <Card style={{ width: '100%' }}>
                  <Card.Header>Teck Stack</Card.Header>
                  <ListGroup variant="flush">
                    <ListGroup.Item>React</ListGroup.Item>
                    <ListGroup.Item>Contentful CMS</ListGroup.Item>
                    <ListGroup.Item>React Bootstrap</ListGroup.Item>
                    <ListGroup.Item>React Semantic UI</ListGroup.Item>
                  </ListGroup>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}