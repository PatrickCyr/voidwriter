import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//import omain from "./image/omain.png";

class Glyph extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    let str = this.props.value;
    let chars = str.split("");
    let letter_main = chars[0];
    let letter_mid = chars.length > 1 ? chars[1] : " ";
    let letter_sup = chars.length > 2 ? chars[2] : " ";
    let letter_sub = chars.length > 3 ? chars[3] : " ";
    
    const path = "images/";
    const suffix = ".png";
    
    let main = path + letter_main + "main" + suffix;
    let mainImg = <img src={main} className="base-image" />;

    let midImg = null;
    if (chars.length > 1 && ' ' != chars[1]) {
      midImg = <img src={path + letter_main + "mid" + chars[1] + suffix} className="image" />;
    }
    let supImg = null;
    if (chars.length > 2 && ' ' != chars[2]) {
      supImg = <img src={path + letter_main + "sup" + chars[2] + suffix} className="image" />;
    }
    let subImg = null;
    if (chars.length > 3 && ' ' != chars[3]) {
      subImg = <img src={path + letter_main + "sub" + chars[3] + suffix} className="image" />;
    }
    
    return (
      <div className="glyph-container">
        {mainImg}
        {midImg}
        {supImg}
        {subImg}
      </div>
    );
  }
}

class GlyphContainer extends React.Component {
  render() {
    return (
      <div>
        <hr />
        <Glyph value="o" />
        <Glyph value="oi"/>
        <Glyph value="oiv"/>
        <Glyph value="oivd" />
        <hr />
      </div>
    );
  }
}

class Square extends React.Component {
  render() {
    return (
      <button className="square">
        {/* TODO */}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square />;
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <h1>VOiD Writer</h1>
        <hr></hr>
        Write text here:
        <textarea id='input_textarea' defaultValue='o,oi,oiv,oivd'></textarea>
        <div className="glyph-container">
          <GlyphContainer />
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
