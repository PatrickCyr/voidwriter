import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Glyph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ctx: null,
      images: [],
      images_to_load: -1,
    };
  }

  componentDidMount() {
    this.updateCanvas();
  }
  
  updateCanvas() {
    this.state.ctx = this.refs.canvas.getContext('2d');
    
    let str = this.props.value;
    let chars = str.split("");
    let letter_main = chars[0];
    let letter_mid = chars.length > 1 ? chars[1] : " ";
    let letter_sup = chars.length > 2 ? chars[2] : " ";
    let letter_sub = chars.length > 3 ? chars[3] : " ";

    const path = "images/";
    const suffix = ".png";
    
    let imageCount = 1;
    let paths = [];
    paths[0] = path + letter_main + "main" + suffix;
    if (chars.length > 1 && ' ' != chars[1]) {
      paths[1] = path + letter_main + "mid" + chars[1] + suffix;
      ++imageCount;
    }
    if (chars.length > 2 && ' ' != chars[2]) {
      paths[2] = path + letter_main + "sup" + chars[2] + suffix;
      ++imageCount;
    }
    if (chars.length > 3 && ' ' != chars[3]) {
      paths[3] = path + letter_main + "sub" + chars[3] + suffix;
      ++imageCount;
    }
    this.state.images_to_load = imageCount;

    let state = this.state;
    
    for (let i = 0; i < 4; ++i) {
      if (paths[i]) {
        let newImg = new Image();
        newImg.src = paths[i];
        this.state.images[i] = newImg;
        newImg.onload = function() {
          state.images_to_load -= 1;
          if (state.images_to_load <= 0) {
            for (let i = 0; i < 4; ++i) {
              if (null != state.images[i]) {
                state.ctx.drawImage(state.images[i], 0, 0);
              }
            }
          }
        }
      }
    }
  }
  
  render() {
    const CANVAS_WIDTH = 200;
    const CANVAS_HEIGHT = 200;
    
    return (
      <canvas ref="canvas" width={300} height={300}> </canvas>
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
          <Glyph value="o v" />
          <Glyph value="oiv"/>
          <Glyph value="o  d" />
          <Glyph value="oi d" />
          <Glyph value="o vd" />
          <Glyph value="oivd" />
        <hr />
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

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
