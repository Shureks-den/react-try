import './MyButton.scss'

export default function MyButton(props) {
    return (
        <div className="button-wrapper">
            <button className="my-button" onClick={props.onClick}>
                {props.label}
            </button>
        </div>
    )
}

