

type TProps = React.InputHTMLAttributes<HTMLInputElement>;

const FieldsInput: React.FC<TProps> = (props) => {
    return <input 
    { ...props }

    className="border p-2 rounded-md shadow-lg shadow-blue-500/50"
    />
}

export default FieldsInput