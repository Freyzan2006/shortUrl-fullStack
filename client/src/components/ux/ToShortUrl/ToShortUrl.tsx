import Button from "@componentsUI/Button/Button"
import FieldsInput from "@/components/ui/FieldInput"
import { IForm } from "./IToShortUrl.interface";
import { FieldErrors, SubmitHandler, UseFormRegister } from "react-hook-form";
import ErrorMessage from "@/components/ui/ErrorMessage";

interface IProps {
    register: UseFormRegister<IForm>
    handleSubmit: (onSubmit: (data: IForm) => void) => (e: React.FormEvent<HTMLFormElement>) => void;
    errors: FieldErrors<IForm>;  
    onSubmit: SubmitHandler<IForm>;
}

const ToShortUrl: React.FC<IProps> = ({
    register,
    handleSubmit,
    errors,
    onSubmit,
}) => {
    return (
        <form 
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col item-center gap-3 border border-blue-500 rounded-md p-3"
        >
            <FieldsInput 
                {...register("url", { required: "This field is required" })}
                placeholder="Перейти по ссылки..."
            />

            {errors.url && <ErrorMessage>{errors.url.message}</ErrorMessage>}

            <Button>
                Перейти по ссылки 
            </Button>
        </form>
    )
}

export default ToShortUrl