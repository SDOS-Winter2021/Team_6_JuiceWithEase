import React from 'react'
import { Navbar, Nav, Container, Row, NavDropdown } from 'react-bootstrap'
import '../assets/css/style.css';


function Header() {


    return (
  <header id="header" className="fixed-top header-inner-pages">
    <Container className="container d-flex align-items-center justify-content-between">

      <h1 ><a href="index.html"><b>JuiceWithEase!</b></a></h1>
      {/* <!-- <a href="index.html" class="logo"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>--> */}

      <nav className="nav-menu d-none d-lg-block">
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Subscribe</a></li>
          <li class="drop-down"><a href="#portfolio">Order</a>
            <ul>
              <li><a href="#">Drop Down 1</a></li>
              <li><a href="#">Drop Down 2</a></li>
              <li><a href="#">Drop Down 3</a></li>
              <li><a href="#">Drop Down 4</a></li>
            </ul></li>
          <li><a href="#team">Contact Us</a></li>
          <li ><a href="">Blog</a></li>
          <li><a href="#contact">News</a></li>

        </ul>
      </nav>

      {/* <a href="#about" class="get-started-btn scrollto">Get Started</a> */}

    </Container>
  </header>
    )
}

export default Header