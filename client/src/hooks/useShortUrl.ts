import { shortUrlService } from "@/api/services/ShortUrlService";
import { useQuery } from "@tanstack/react-query";


export function useShortUrl() {
    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ["shortUrls"], 
        queryFn: () => shortUrlService.getAllShortUrl(),
    })


    return { shortUrls: data, error, isLoading, refetch }
}