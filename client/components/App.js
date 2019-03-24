import React, { Component } from 'react';

import './../scss/app.scss'

class App extends Component {
  state = {
    currentImageUrl : '',
    err: '',
  }
  
  handleChange = e => {
    const file = e.target.files[0];
    const fileName = e.target.files[0].name;

    // Convert file into base 64 format

    const newFileReader = new FileReader();
    newFileReader.readAsDataURL(file);

    newFileReader.onload = (e) => {
      // console.log(e.target.result)
      const newImage  = new Image();
      newImage.src = e.target.result;

      newImage.onload = (e) => {
        const { height, width, src} = e.target;

        if (height > 450 && width > 650) {
          this.setState({
            currentImageUrl: src,
            err : '',
            name: fileName
          })
        } else {
          this.setState({
            err : `Your Image should be more than 650 X 450. But your image is ${width}X${height}`,
            currentImageUrl : ''
          })
        }
        }
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    // console.log( this.state.currentImageUrl);
    const {currentImageUrl, name} = this.state
    
    fetch(`/api/image`, {
      method: "POST",
      headers: {
        'content-type': 'application/json',
      },  
      body: JSON.stringify({
        imgUrl : currentImageUrl,
        fileName: name
      })
    })
      .then(res => res.json())
      .then(({ url }) => {
        this.setState({
          currentImageUrl : url
        })
      })

  }

  render() {
    const {  currentImageUrl, err } = this.state
    
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="file" id="" accept="image/png, image/jpeg" onChange={this.handleChange}/>
          <input type="submit" value="Submit" onClick={this.handleSubmit}/>
        </form> 
        {
          err ? <p>{err}</p> : ""
        }
        {
          currentImageUrl ? <img src={currentImageUrl} alt=""/> : ''
        }
      </div>
    );
  }
}

export default App;