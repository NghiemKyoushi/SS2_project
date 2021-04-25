import React from "react";
// import 'bootstrap/dist/css/bootstrap.css';
import {Carousel} from 'react-bootstrap';
class Slide extends React.Component {
  render() {
    return (
      <Carousel >
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://file.hstatic.net/1000230642/file/banner-be-trai_d4d5c86d3b7845e5876752376099a6af_master.jpg"
          alt="First slide"
        />
     
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://file.hstatic.net/1000230642/file/banner-be-gai_013d411593894fb9806d9d9ded8950f9_master.jpg"
          alt="Second slide"
        />
    
        
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://file.hstatic.net/1000230642/file/cong-tri-0502_0dd8c3119757422e9e45fbb600c7aa37.jpg"
          alt="Third slide"
        />
    
       
      </Carousel.Item>
    </Carousel>
       

    );
  }
}
export default Slide;
