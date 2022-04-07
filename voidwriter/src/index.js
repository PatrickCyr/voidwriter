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
    let newState = {
      ctx: this.refs.canvas.getContext('2d'),
      images: [],
      images_to_load: -1,
    };
    
    let str = this.props.value;
    let chars = str.split("");
    let letter_main = chars[0];

    const path = "images/";
    const suffix = ".png";
    
    let imageCount = 1;
    let paths = [];
    paths[0] = path + letter_main + "main" + suffix;
    for (let ix = 1; ix < chars.length; ++ix) {
      if (chars.length > ix && ' ' !== chars[ix]) {
        paths[ix] = path + letter_main + ix + chars[ix] + suffix;
        ++imageCount;
      }
    }
    newState.images_to_load = imageCount;
    
    for (let i = 0; i < chars.length; ++i) {
      if (paths[i]) {
        let newImg = new Image();
        newImg.src = paths[i];
        newState.images[i] = newImg;
        newImg.onload = function() {
          // *** onload handler
          newState.images_to_load -= 1;
          if (newState.images_to_load <= 0) {
            let w = -1;
            let h = -1;
            // Determine total width and height of all images.
            for (let ii = 0; ii < chars.length; ++ii) {
              if (null != newState.images[i]) {
                w = Math.max(w, newState.images[i].width);
                h = Math.max(h, newState.images[i].height);
              }
            }

            // Resize the canvas.
            newState.ctx.canvas.width = w;
            newState.ctx.canvas.height = h;

            // Draw images into canvas.
            for (let jj = 0; jj < chars.length; ++jj) {
              if (null != newState.images[jj]) {
                newState.ctx.drawImage(newState.images[jj], 0, 0);
              }
            }
          }
          // *** onload handler end
        }
      }
    }

    this.setState(newState);
  }
  
  render() {
    // These 1s are replaced with the real dimensions once all the images are loaded.
    return (
      <canvas ref="canvas" width={1} height={1}> </canvas>
    );
  }
}

var nextGlyphKey = 0;

class GlyphContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {

    //let input = "o, oi, o v, oiv, o  d, oi d, o vd, oivd";
    let input = this.props.value;
    
    let inputArray = input.split(',');
    
    let glyphArray = [];
    for (let i = 0; i < inputArray.length; ++i) {
      // Remove leading and trailing whitespace.
      inputArray[i] = inputArray[i].trim();
      
      let key = "glyph_"+(nextGlyphKey++);
      glyphArray[i] = <Glyph key={key} value={inputArray[i]} />
    }
    
    return (
      <div>
        {glyphArray}
      </div>
    );
  }
}


class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {text: ""};

    this.onTextChanged = this.onTextChanged.bind(this);
  }
  
  onTextChanged(event) {
    this.setState({text: event.target.value})
  }
  
  render() {
    return (
      <div className="game">
        <h1>VOiD Writer</h1>
        Write text here. Separate each glyph with a comma.
        <textarea id='input_textarea' defaultValue='o,oi,oiv,oivd' onChange={this.onTextChanged}></textarea>
        <div className="glyph-container">
          <GlyphContainer value={this.state.text}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
