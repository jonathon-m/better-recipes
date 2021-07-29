import { useRouter } from "next/router";
import SearchBar from "../components/searchbar";
import Welcome from "../components/welcome";
import { motion } from "framer-motion"

export default function Home() {

  const router = useRouter()

  const onUrlSubmit = (url: string) => {
    router.push(`/recipe/${encodeURIComponent(url)}`)
  }

  return (
    <div className="bg-apple-pattern bg-16 w-screen h-screen grid place-items-center">
      <motion.div initial={{ x: 200 }} animate={{ x: 0 }} className="max-w-md py-12 px-12 bg-white sm:rounded-lg ring-2 ring-green-400">
        <Welcome/>
        <SearchBar search={onUrlSubmit}></SearchBar>
      </motion.div>
        
    </div>
  )
}
