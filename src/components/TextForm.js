import React, {useState} from 'react'

export default function TextForm(props) {
    const handleUpClick = ()=>{
        // console.log("Uppercase was clicked" + text)
        let newText = text.toUpperCase();
        setText(newText);
    };
    const handleLoClick = ()=>{
        let newText = text.toLowerCase();
        setText(newText);
    };
    const HandleonChange = (event)=>{
        // console.log("Handel on change")
        setText(event.target.value)
    };
    const [text, setText] = useState("Enter text here");
  return (
    <>
    <div className='container'>
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea className="form-control" value={text} placeholder={text} onChange={HandleonChange} id="myBox" rows="8"></textarea>
        </div>
        <button className="btn btn-primary mx-2" onClick={handleUpClick}>Convert to Uppercase</button>
        <button className="btn btn-primary mx-2" onClick={handleLoClick}>Convert to Lowercase</button>
    </div>
    <div className="container my-3">
        <h1>You text summary</h1>
        <p>{text.split(" ").length} words and {text.length} characters</p>
    </div>
    </>
  )
}
