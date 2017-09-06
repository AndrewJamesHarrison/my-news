import React, { Component } from 'react';

class Article extends React.Component {
  render() {
    return (
      <div className="Article">
        <h1>Shopping List for {this.props.id}</h1>
      </div>
    );
  }
}