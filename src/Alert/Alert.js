import './Alert.scss';

export default function Alert(props) {
    return (
        <div className="alert" onClick={props.onClick}>
            {props.message}
        </div>
    )
}