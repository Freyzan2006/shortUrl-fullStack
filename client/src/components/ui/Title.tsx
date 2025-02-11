
interface IProps {
    children: React.ReactNode;
}

const Title: React.FC<IProps> = ({ children }) => {
    return <span
    className="text-while text-lg font-medium"
    >
        { children }
    </span>
}

export default Title