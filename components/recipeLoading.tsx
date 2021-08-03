import Image from "next/image"


export default function RecipeLoading() {


  return <div className="animate-bounce absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <Image alt="Bouncing fruit" src="/fruit/chili-pepper.svg" width="70" height="70"/>
        </div>


}