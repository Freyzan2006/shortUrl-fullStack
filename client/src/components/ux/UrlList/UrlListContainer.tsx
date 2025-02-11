
import UrlList from "./UrlList"
import { useShortUrl } from "@/hooks/useShortUrl"

const UrlListContainer: React.FC = () => {
    const { shortUrls, error, isLoading } = useShortUrl()

    if ( isLoading ) return <div>Loading...</div>
    if ( error ) return <div>{ error?.message }</div>
    
    return (
        <UrlList shortUrls = { shortUrls } />
    )
}

export default UrlListContainer