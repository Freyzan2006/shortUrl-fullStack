import { FieldErrors, SubmitHandler, UseFormRegister } from "react-hook-form";
import { IForm } from "./IForm.Interface"; 
import Button from "@/components/ui/Button/Button";
import FieldsInput from "@/components/ui/FieldInput";
import Title from "@/components/ui/Title";
import { IShortUrl } from "@/interface/shortUrl.interface";
import ErrorMessage from "@/components/ui/ErrorMessage";

interface ICreateShortUrlProps {
    register: UseFormRegister<IForm>
    handleSubmit: (onSubmit: (data: IForm) => void) => (e: React.FormEvent<HTMLFormElement>) => void;
    errors: FieldErrors<IForm>;  
    onSubmit: SubmitHandler<IForm>;
    createdShortUrl: IShortUrl | null
}

const CreateShortUrl: React.FC<ICreateShortUrlProps> = ({
    register,
    handleSubmit,
    errors,
    onSubmit,
    createdShortUrl
}) => {
    return (
        <form 
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col item-center gap-3 border border-blue-500 rounded-md p-3"
        >
           <Title>
                Создать сокращённую ссылку
           </Title>
        
            <FieldsInput 
                {...register("originalUrl", { required: "This field is required" })}
                placeholder="Оригинальный URL"
            />

            {errors.originalUrl && <ErrorMessage>{errors.originalUrl.message}</ErrorMessage>}

           
            <FieldsInput
                {...register("alias", { 
                    required: "Alias is required", 
                    maxLength: { value: 20, message: "Alias must be at most 20 characters long" }
                })}
                placeholder="Введите псевдоним"
            />
            {errors.alias && <ErrorMessage>{errors.alias.message}</ErrorMessage>}

          
            <FieldsInput
                type="datetime-local"
                {...register("expiresAt")}
                placeholder="Expiration date"
            />
            {errors.expiresAt && <ErrorMessage>{errors.expiresAt.message}</ErrorMessage>}
            
            { createdShortUrl && <a href = { createdShortUrl.shortUrl }>New short URL: { createdShortUrl.shortUrl }</a> }
            
            <Button type = "submit">
                Create Short URL
            </Button>
        </form>
    );
};

export default CreateShortUrl;
