
import Button from "@/components/ui/Button/Button"
import { IShortUrlResponse } from "@/interface/shortUrl.interface"

interface IProps {
    onSubmit: (e: React.FormEvent) => void
    value: string 
    setValue: (prev: string) => void
    error: string | null
    isLoading: boolean
    url: IShortUrlResponse | null
}

const FindUrl: React.FC<IProps> = (props) => {
  return (
    <form 
    onSubmit={props.onSubmit}
    className="flex flex-col items-center gap-3" 
    >
      Поиск оригинального URL 
      <input
        type="text"
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}  
        className="rounded-md pl-3 outline-none border border-blue-500 shadow-lg shadow-blue-500/50"
      />
      


      <Button disabled = { props.value.length <= 0 || false } type="submit">
        Find this url
      </Button>

      {props.error && <div>Error: {props.error}</div>}  
      {props.isLoading ? (
        <div>Loading...</div>  
      ) : (
        <ul>
          {
            props.url 
            &&  
            <li>
              <a href={props.url.originalUrl}>{props.url.originalUrl}</a>
            </li>
          }
        
        </ul>
      )}
    </form>
  );
};

export default FindUrl;