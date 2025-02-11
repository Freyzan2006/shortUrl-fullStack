
interface IProps {
    children: React.ReactNode 
}

const ErrorMessage: React.FC<IProps> = ({ children }) => {
    return (
        <div className="border border-red-300 rounded-md shadow-lg shadow-red-500/50 bg-red-500 p-3 flex justify-center items-center gap-3">
            { children }
        </div>
    )
}

export default ErrorMessage