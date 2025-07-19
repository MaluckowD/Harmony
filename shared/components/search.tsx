import { Search } from "lucide-react"
import { Input } from "./ui/input"

export const SearchItem = () => {
    return(
        <div className="relative ml-5">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Поиск чатов..."
                className="pl-8"
                // value={searchQuery}
                // onChange={(e) => setSearchQuery(e.target.value)}
                />
        </div>
    )
}