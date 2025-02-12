
import { shortUrlService } from "@/api/services/ShortUrlService"
import UrlList from "./UrlList"
import { useShortUrl } from "@/hooks/useShortUrl"

const UrlListContainer: React.FC = () => {
    const { shortUrls, error, isLoading, refetch } = useShortUrl()



    const deleteShortUrl = async (shortUrl: string) => {
        const response = await shortUrlService.deleteShortUrl(shortUrl)
        console.log(response)
        refetch()
    }
    
    return (
        <UrlList 
        shortUrls = { shortUrls } 
        deleteShortUrl = { deleteShortUrl } 
        isLoading = { isLoading }
        error = { error }
        />
    )
}

export default UrlListContainer