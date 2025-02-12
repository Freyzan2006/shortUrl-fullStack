import Button from "@/components/ui/Button/Button"
import ErrorMessage from "@/components/ui/ErrorMessage"
import { IShortUrlResponse } from "@/interface/shortUrl.interface"


interface IProps {
    shortUrls: IShortUrlResponse[] | null | undefined
    isLoading: boolean
    error: Error | null
    deleteShortUrl: (shortUrl: string) => void
}

const UrlList: React.FC<IProps> = ({ shortUrls, deleteShortUrl, isLoading, error }) => {
    if (!shortUrls?.length) return <ErrorMessage>Коротких ссылок нету</ErrorMessage> 

    if ( isLoading ) return <div>Loading...</div>
    if ( error ) return <ErrorMessage>{ error?.message }</ErrorMessage>

    return (
        <div className="flex flex-col items-center gap-5">
            <h3 className="text-orange-500 text-3xl">
                Все ссылки
            </h3>
            <ul className="flex p-3 justify-content-center  gap-3 flex-col items-center bg-blue-500 shadow-lg shadow-cyan-500/50 max-w-[500px] w-full border  rounded-md border-blue-600">
                {
                    shortUrls.map((shortUrl: IShortUrlResponse) => 
                    <li className = "flex justify-center items-center gap-3 flex-wrap"  key = { shortUrl.id }>
                        <a href = { shortUrl.originalUrl } className=" max-w-[300px] w-full break-words border border-blue-600 p-1 cursor-pointer rounded-md hover:scale-105 transition-all text-orange-500">
                            Origin: { shortUrl.originalUrl }
                        </a>
                        <span className=" border border-blue-600 p-1 cursor-pointer rounded-md hover:scale-105 transition-all">
                            Short: { shortUrl.shortUrl }
                        </span>
                        <span className=" border border-blue-600 p-1 cursor-pointer rounded-md hover:scale-105 transition-all">
                            alias: { shortUrl.alias }
                        </span>
                        <Button onClick = { () => deleteShortUrl(shortUrl.shortUrl) }>
                            delete this url 
                        </Button>
                    </li>
                    )
                }
            </ul>
        </div>
    )
}

export default UrlList