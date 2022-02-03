//libraries
import React, { Component } from "react";
import Header from "../Header";
import Footer from "../Footer";

class Layout extends Component {
  render() {
    return (
      <>
        <Header />
        <main>{this.props.children}</main>
        <Footer />
      </>
    );
  }
}

export default Layout;
