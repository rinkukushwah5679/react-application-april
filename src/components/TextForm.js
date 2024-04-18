import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";

export default function TextForm(props) {
    const navigate = useNavigate();
    const handleUpClick = ()=>{
      // console.log("Uppercase was clicked" + text)
      let newText = text.toUpperCase();
      setText(newText);
    };
    const handleLoClick = ()=>{
      let newText = text.toLowerCase();
      setText(newText);
    };

    const handleClear = ()=>{
      setText("");
    };

    const handleCopy = ()=>{
      let text = document.getElementById("myBox");
      text.select();
      navigator.clipboard.writeText(text.value);
    };

    const handleExtraSpaces = ()=>{
      let newText = text.split(/[ ]+/);
      setText(newText.join(" "));
    };

    const HandleonChange = (event)=>{
      // console.log("Handel on change")
      setText(event.target.value)
    };
    const [text, setText] = useState("");
  return (
    <>
    <div className='container'>
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea className="form-control" value={text} placeholder={text} onChange={HandleonChange} id="myBox" rows="8"></textarea>
        </div>
        <button className="btn btn-primary mx-2 my-1" onClick={handleUpClick}>Convert to Uppercase</button>
        <button className="btn btn-primary mx-2 my-1" onClick={handleLoClick}>Convert to Lowercase</button>
        <button className="btn btn-primary mx-2 my-1" onClick={handleClear}>Clear</button>
        <button className="btn btn-primary mx-2 my-1" onClick={handleCopy}>Text Copy</button>
        <button className="btn btn-primary mx-2 my-1" onClick={handleExtraSpaces}>Remove extra spaces</button>
        <button className="btn btn-primary mx-2 my-1" onClick={() => navigate("/posts")}>
            Posts
        </button>
    </div>
    <div className="container my-3">
        <h1>You text summary</h1>
        <p>{text.split(" ").filter((ele) =>{return ele.length !== 0}).length} words and {text.length} characters</p>
    </div>
    </>
  )
}
