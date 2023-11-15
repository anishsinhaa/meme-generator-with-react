import React, { useEffect, useRef } from "react";
import image from "../images/meme.png";
import html2canvas from "html2canvas";
export default function Meme() {

  const canvasRef = useRef(null)
  useEffect(()=>{
    const canvas = canvasRef.current
    canvas.height= 500
    canvas.width=500
  },[])

  const downloadImage=()=>{
    html2canvas(canvasRef.current,{ logging: true, letterRendering: 1,allowTaint: true,  useCORS: true }).then((canvas)=>{
      var anchor = document.createElement('a');
      anchor.href = canvas.toDataURL('myMeme/jpg');
      anchor.download = 'myMeme.jpg';  
      anchor.click();
    })
  }
  //useEffect -- API FETCH
  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((Res) => Res.json())
      .then((data) => setAllMeme(data.data.memes));
  }, []);
  // useState-- MEME
  var [meme, setMeme] = React.useState(
    {
      topText: "",
      bottomText: "",
      width: 0,
      height: 0,
      imgURL: image,
    },
    []
  );
  //useState -- All MEMES
  var [allMemes, setAllMeme] = React.useState([]);
  // useState -- Show/Hide Upload Button
  const [showUploadButton, setShowUploadButton] = React.useState(false);
  //Function to toggle upload image input
  function toggleUploadButton(event) {
    event.preventDefault();
    console.log("toggle");
    setShowUploadButton((prevShowUploadButton) => !prevShowUploadButton);
  }
  //Function to get new meme image from collection
  function getMemeImage(event) {
    event.preventDefault();
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const newMeme = allMemes[randomNumber];
    setMeme((prevMeme) => ({
      ...prevMeme,
      imgURL: newMeme.url,
      width: newMeme.width,
      height: newMeme.height,
    }));
  }

  //Function to handle change in the input boxes
  function handleChange(event) {
    event.preventDefault();
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        [event.target.className]: event.target.value,
      };
    });
  }
  //Function to upload image as set it as the new meme image
  function uploadImage(event) {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      const uploadedImage = e.target.result;
      setMeme((prevMeme) => ({ ...prevMeme, imgURL: uploadedImage }));
    };
    reader.readAsDataURL(file);
  }
  return (
    <div className="meme">
      <form className="form">
        <input
          type="text"
          placeholder="Top Text"
          className="topText"
          onChange={handleChange}
        ></input>
        <input
          type="text"
          placeholder="Bottom Text"
          className="bottomText"
          onChange={handleChange}
        ></input>
        <button type="submit" onClick={getMemeImage} className="btn">
          Get a new Meme Image !
        </button>
      </form>
      <div className="upload">
        <button
          type="button"
          onClick={toggleUploadButton}
          className="toggle-btn"
        >
          Upload Image
        </button>
        {showUploadButton && (
          <input type="file" onChange={uploadImage} className="upload-btn" />
        )}
      </div>
      <div className="meme" id='meme' ref={canvasRef}>
        <img src={meme.imgURL} className="meme-image" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
      <button className="btn" onClick={downloadImage}>Download</button>
    </div>
  );
}
