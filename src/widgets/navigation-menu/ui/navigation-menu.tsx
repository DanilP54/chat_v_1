import { navLinks } from "@/shared/constants/navigation-links";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Link } from "react-router-dom";

export default function NavigationMenu() {
    return (
        <>
            <nav>
                <ul className="flex flex-col">
                    <li className="flex items-center gap-4">
                        <Link to="/profile">
                            <Avatar>
                                <AvatarImage />
                                <AvatarFallback>DP</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <h3>Danil Putro</h3>
                                <span className="text-[13px]">Что-то ещё...</span>
                            </div>
                        </Link>
                    </li>
                    {
                        navLinks.map(link => (
                            <li key={link.name}>
                                <Link to={link.route}>{link.name}</Link>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </>
    )
}