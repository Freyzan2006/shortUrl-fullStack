


const Docs: React.FC = () => {
    return (
        <ul className="flex flex-col item-center gap-3 border border-yellow-400 shadow-lg shadow-yellow-500/50  rounded-md p-3">
            <li>Docs:</li>
            <li>1.Пути до backend:</li>
            <li className="pl-5">-Получение всех urls GET: <a href="http://localhost:8000/shorten/">http://localhost:8000/shorten/</a></li>
            <li className="pl-5">-Найти оригинальную ссылку по укороченной urls GET: <a href="http://localhost:8000/shorten/?shortUrl=url1">http://localhost:8000/shorten/?shortUrl=url1</a></li> 
        </ul>
    )
}

export default Docs 