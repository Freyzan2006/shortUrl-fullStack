import Button from "@/components/ui/Button/Button"
import ErrorMessage from "@/components/ui/ErrorMessage"
import FieldInput from "@/components/ui/FieldInput"
import Title from "@/components/ui/Title"
import { IShortUrl } from "@/interface/shortUrl.interface"
import { parseDate } from "@/utils/parseData"

interface IProps {
    infoShortUrl: IShortUrl | undefined | null
    isLoading: boolean
    error: Error | null
    stateForm: { onSubmit: (e: React.FormEvent) => void,value: string, setValue: (prev: string) => void }
}


const InfoShortUrl: React.FC<IProps> = (
{ infoShortUrl, isLoading, error, stateForm }) => {

   
    
   
    return (
        <>
            <form 
            onSubmit = { stateForm.onSubmit }
            className="flex flex-col item-center gap-3 border border-blue-500 rounded-md p-3"
            >
                <Title>
                    Для получение информации
                </Title>
                <FieldInput 
                value = { stateForm.value } 
                onChange={ (e) => stateForm.setValue(e.target.value) } 
                placeholder="Введите short Url"
                />
                <Button type = "submit">
                    Получить информацию
                </Button>
            </form>

            { error && <ErrorMessage>Не получилось найти ссылку</ErrorMessage> }
            {
                isLoading 
                ?
                    <div>Loading...</div>
                :
                infoShortUrl 
                && 
                <ul 
                className="flex flex-col item-center gap-3 border border-blue-500 rounded-md p-3"
                >
                    <li>ID: { infoShortUrl.id }</li>
                    <li>Origin url: { infoShortUrl.originalUrl }</li>
                    <li>Short url: { infoShortUrl.shortUrl }</li>
                    <li>alias: { infoShortUrl.alias }</li>
                    <li>expiresAt: { parseDate(infoShortUrl.expiresAt) }</li>
                </ul>
            }
        </>

    )
}

export default InfoShortUrl