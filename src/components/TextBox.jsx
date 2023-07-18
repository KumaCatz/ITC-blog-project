import '../css/TextBox.css'

function TextBox({handleGenerate, body}) {

    return (
        <div className='container'>
            <textarea placeholder="What you have in mind..."></textarea>
            <button onClick={ handleGenerate }>Tweet</button>
        </div>
    )
};

export default TextBox;