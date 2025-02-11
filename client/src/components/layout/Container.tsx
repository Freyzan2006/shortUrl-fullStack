
interface IProps {
    children: React.ReactNode
}

const Container: React.FC<IProps> = ({ children }) => {
    return (
        <div className="max-w-[1140px] sm:max-w-[400px] md:max-w-[800px] lg:max-w-[1000px] w-full pl-15 pr-15 pt-0 pb-0 mt-0 mb-0 ml-[auto] mr-[auto]">
            { children }
        </div>
    )
}

export default Container 