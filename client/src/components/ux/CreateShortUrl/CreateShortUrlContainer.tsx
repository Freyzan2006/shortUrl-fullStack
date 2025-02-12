import CreateShortUrl from "./CreateShortUrl"
import { useForm, SubmitHandler } from "react-hook-form"
import { IForm } from "./IForm.Interface";
import { shortUrlService } from "@/api/services/ShortUrlService";
import { useState } from "react";
import { IShortUrlResponse } from "@/interface/shortUrl.interface";
import { useShortUrl } from "@/hooks/useShortUrl";


// {
//     "originalUrl": "https://example.com",
//     "expiresAt": "2025-12-31T23:59:59Z",
//     "alias": "mycustomalias"
//   }

const CreateShortUrlContainer: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IForm>();

    const [ createdShortUrl, setCreatedShortUrl ] = useState<IShortUrlResponse | null>(null)
    const { refetch } = useShortUrl()

    const onSubmit: SubmitHandler<IForm> = async (data) => {
        console.log(data);

        const response = await shortUrlService.createShortUrl(data)
        if ( response === null ) {
            console.error("Ошибка при создании короткой ссылки");
            return 
        }
        setCreatedShortUrl(response)
        console.log(response)
        refetch()
    };

    return (
        <CreateShortUrl
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            onSubmit={onSubmit}
            createdShortUrl = { createdShortUrl }
        />
    );
};

export default CreateShortUrlContainer;