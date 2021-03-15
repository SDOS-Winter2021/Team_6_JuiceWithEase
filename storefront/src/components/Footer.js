import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import '../assets/css/style.css';

function Footer() {
    return (
  <footer id="footer" className="footer fixed-bottom">
    {/* <Container className="footer-top">
      <Container className="container">
        <Row id="row"> */}

          {/* <Row id="col-lg-3 col-md-6">
            <Row className="footer-info">
              <h3>JWE<span>.</span></h3>
             
              <div className="social-links mt-3">
                <a href="#" className="twitter"><i className="bx bxl-twitter"></i></a>
                <a href="#" className="facebook"><i className="bx bxl-facebook"></i></a>
                <a href="#" className="instagram"><i className="bx bxl-instagram"></i></a>
                <a href="#" className="linkedin"><i className="bx bxl-linkedin"></i></a>
              </div>
            </Row>
          </Row> */}

          {/* <div class="col-lg-2 col-md-6 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li><i className="bx bx-chevron-right"></i> <a href="#">Home</a></li>
              <li><i className="bx bx-chevron-right"></i> <a href="#">About us</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="#">Products</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="#">Terms of service</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="#">Refund policy</a></li>
            </ul>
          </div> */}

          {/* <div class="col-lg-3 col-md-6 footer-links">
            <h4>Our Services</h4>
            <ul>
              <li><i class="bx bx-chevron-right"></i> <a href="#">Web Design</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="#">Web Development</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="#">Product Management</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="#">Marketing</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="#">Graphic Design</a></li>
            </ul>
          </div> */}

        {/* </Row>
      </Container>
    </Container> */}

    <Container id="container">
      <div class="copyright">
        &copy; Copyright <strong><span>JuiceWithEase</span></strong> All Rights Reserved
      </div>
      {/* <div class="credits">
       
        Terms and Condition <a href="https://bootstrapmade.com/">Refund Policy</a>
      </div> */}
    </Container>
      <a href="#" className="back-to-top"><i className="ri-arrow-up-line"></i></a>
  {/* <div id="preloader"></div> */}

  <script src="assets/vendor/jquery/jquery.min.js"></script>
  <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="assets/vendor/jquery.easing/jquery.easing.min.js"></script>
  <script src="assets/vendor/php-email-form/validate.js"></script>
  <script src="assets/vendor/owl.carousel/owl.carousel.min.js"></script>
  <script src="assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
  <script src="assets/vendor/venobox/venobox.min.js"></script>
  <script src="assets/vendor/waypoints/jquery.waypoints.min.js"></script>
  <script src="assets/vendor/counterup/counterup.min.js"></script>
  <script src="assets/vendor/aos/aos.js"></script>
  </footer>

    )
}

export default Footer