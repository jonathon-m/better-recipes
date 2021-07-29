import { useState } from "react";
import isURL from 'validator/lib/isURL';

export default function SearchBar(props: { search: (arg: string) => void } ) {
    const [urlInput, setUrlInput] = useState<string>();
    const [urlValid, setUrlValid] = useState(false);
    const [urlError, setUrlError] = useState<string>();
  
    const urlChangeHandler = (e: any) => {
      setUrlInput(e.target.value)
      const valid = isURL(e.target.value)
      setUrlValid(valid)
      if (!e.target.value || valid) {
        setUrlError('')
      }
    }
  
    const onSubmit = (e: any) => {
      e.preventDefault()
      if (urlInput && urlValid) {
        props.search(urlInput)
      } else {
        setUrlError('That\'s not a URL! Make sure to copy-paste from a recipe website')
      }
    }

  return <form onSubmit={onSubmit}>
            <div className="relative text-gray-600 mb-6">
                <input 
                  type="search" 
                  name="search" 
                  placeholder="Paste a recipe URL here to start" 
                  autoComplete="off"
                  onChange={urlChangeHandler} 
                  className={"bg-white h-10 px-5 pr-10 w-full rounded-full text-sm focus:outline-none ring-2 " + ((urlInput && !urlValid) ? 'ring-red-300' : 'ring-gray-600')}
                  />
                <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                </button>
            </div>
            { urlError && <div>{urlError}</div>}
        </form>

}