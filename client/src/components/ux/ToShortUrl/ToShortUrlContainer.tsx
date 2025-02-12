import ToShortUrl from "./ToShortUrl"
import { SubmitHandler, useForm } from "react-hook-form";
import { IForm } from "./IToShortUrl.interface";
import { shortUrlService } from "@/api/services/ShortUrlService";



const ToShortUrlContainer: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IForm>();

    

    const onSubmit: SubmitHandler<IForm> = async (data) => {
        console.log(data);

        const response = await shortUrlService.redirectToOriginUrl(data.url)
        if ( response === null ) {
            console.error("Ошибка при создании короткой ссылки");
            return 
        }
        
        if (window.confirm(`Хотете перейти по ссылке ${response.url} ?`))
            window.location.href = response.url
         
        console.log(response)
    };


    return <ToShortUrl 
        register = { register }
        handleSubmit = { handleSubmit }
        errors = { errors }
        onSubmit = { onSubmit }
    />
}

export default ToShortUrlContainer