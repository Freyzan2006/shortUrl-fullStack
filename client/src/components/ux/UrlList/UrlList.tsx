import { IShortUrl } from "@/interface/shortUrl.interface"


interface IProps {
    shortUrls: IShortUrl[] | null | undefined
}

const UrlList: React.FC<IProps> = ({ shortUrls }) => {
    if (!shortUrls) return <div>Данные не найдены</div> 


    return (
        <div className="flex flex-col items-center gap-5">
            <h3 className="text-orange-500 text-3xl">
                Все ссылки
            </h3>
            <ul className="flex p-3 justify-content-center  gap-3 flex-col items-center bg-blue-500 shadow-lg shadow-cyan-500/50 max-w-[500px] w-full border  rounded-md border-blue-600">
                {
                    shortUrls.map((shortUrl: IShortUrl) => 
                    <li className = "flex justify-center items-center gap-3 flex-wrap"  key = { shortUrl.id }>
                        <a href = { shortUrl.originalUrl } className=" max-w-[300px] w-full break-words border border-blue-600 p-1 cursor-pointer rounded-md hover:scale-105 transition-all text-orange-500">
                            Origin: { shortUrl.originalUrl }
                        </a>
                        <a href = { shortUrl.shortUrl } className=" border border-blue-600 p-1 cursor-pointer rounded-md hover:scale-105 transition-all">
                            Short: { shortUrl.shortUrl }
                        </a>
                    </li>
                    )
                }
            </ul>
        </div>
    )
}

export default UrlList