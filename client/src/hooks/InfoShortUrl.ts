import { shortUrlService } from "@/api/services/ShortUrlService";
import { useQuery } from "@tanstack/react-query";


export function useInfoShortUrl(shortUrl: string) {
    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ["infoShortUrl"], 
        queryFn: () => shortUrlService.infoShortUrl(shortUrl),
    })


    return { infoShortUrl: data, error, isLoading, refetch }
}