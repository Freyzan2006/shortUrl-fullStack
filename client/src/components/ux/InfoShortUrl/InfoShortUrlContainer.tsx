import { useInfoShortUrl } from "@/hooks/InfoShortUrl"
import InfoShortUrl from "./InfoShortUrl"
import { useState } from "react"



const InfoShortUrlContainer: React.FC = () => {
    const [ value, setValue ] = useState("")
    const { infoShortUrl, isLoading, error, refetch } = useInfoShortUrl(value)
    


    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        
        refetch()
    }

    return <InfoShortUrl
        infoShortUrl = { infoShortUrl }
        isLoading = { isLoading }
        error = { error }
        stateForm = { { value, setValue, onSubmit } }
    />
}

export default InfoShortUrlContainer