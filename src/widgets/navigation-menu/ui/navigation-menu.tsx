import {navLinks} from "@/shared/constants/navigation-links";
import {Avatar, AvatarFallback, AvatarImage} from "@/shared/ui/avatar";
import {Link} from "react-router-dom";
import {useAuthState} from "@/entities/session";
import {StateAuthSuccess} from "@/shared/types";
import {Session} from "@/entities/session/session.model.ts";

export default function NavigationMenu() {

    const {current_session} = useAuthState() as StateAuthSuccess<Session>

    return (
        <>
            <nav className='p-3'>
                <ul className="flex flex-col">
                    <li className='relative after:content-[""] after:absolute after:-bottom-5 after:left-0 after:h-[1px] after:bg-gray-300 after:w-full'>
                        <div className='text-center'>
                            <Link className='inline-block' to="/profile">
                                <Avatar className='w-20 h-20'>
                                    <AvatarImage src={current_session.viewer.profile.avatar!} className='w-20'/>
                                    <AvatarFallback className='w-20'>DP</AvatarFallback>
                                </Avatar>
                            </Link>
                        </div>
                        <div className="flex flex-col items-center mt-3">
                            <h3 className='font-bold'>{current_session.viewer.profile.display_name}</h3>
                            <span className="text-[13px] font-bold">{current_session.viewer.profile.phone_number}</span>
                        </div>
                    </li>
                    {/*{*/}
                    {/*    navLinks.map(link => (*/}
                    {/*        <li key={link.name}>*/}
                    {/*            <Link to={link.route}>{link.name}</Link>*/}
                    {/*        </li>*/}
                    {/*    ))*/}
                    {/*}*/}
                </ul>
            </nav>
        </>
    )
}