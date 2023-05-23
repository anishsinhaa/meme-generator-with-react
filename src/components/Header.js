import image from "../images/meme.png";
export default function Header() {
  return (
    <header className="header">
      <img src={image} width="80px" alt="header"></img>
      <h1>MEME GENERATOR</h1>
      <div className="header-right">
        <h3>A React Project - &nbsp; </h3>
        <h4>by ANISH SINHA</h4>
      </div>
    </header>
  );
}
