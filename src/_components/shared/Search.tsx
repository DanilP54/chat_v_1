import { Plus } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"


const Search = () => {
  return (
    <div className="flex items-center gap-4">
      <Input className="bg-transparent rounded-lg" type="search" placeholder="Поиск" />
      <Button size="sm" variant="link"><Plus /></Button>
    </div>
  )
}

export default Search