import { shortUrlService } from "@/api/services/ShortUrlService";
import { IShortUrlResponse } from "@/interface/shortUrl.interface";
import { useState } from "react";
import FindUrl from "./FindUrl";


const FindUrlContainer: React.FC = () => {
    const [value, setValue] = useState<string>("");  
    const [url, setUrl] = useState<IShortUrlResponse | null>(null);  
    const [error, setError] = useState<string | null>(null);  
    const [isLoading, setIsLoading] = useState<boolean>(false);  
  
    const onSubmit = async (e: React.FormEvent) => {
      e.preventDefault();  
  
      if (!value) return;  
  
      setIsLoading(true);  
      setError(null);  
      try {
        const response = await shortUrlService.getShortUrl(value);  
        console.log(response)
        if( response ) setUrl(response);  
      } catch (err: any) {
        setError(err.message);  
      } finally {
        setIsLoading(false);  
      }
    };

    return <FindUrl 
        onSubmit = { onSubmit }  
        value = { value }
        setValue = { setValue }
        error = { error }
        isLoading = { isLoading }
        url = { url }
    />
}

export default FindUrlContainer