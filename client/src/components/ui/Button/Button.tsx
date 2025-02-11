import css from "./Button.module.css"

type TProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<TProps> = (props) => {
    return <button {...props} className = { css.button } />
}

export default Button