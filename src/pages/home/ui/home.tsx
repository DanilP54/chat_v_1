import { NavigationMenu } from '@/widgets/navigation-menu';
import { Menu } from './icons';
import { ButtonSheet } from "@/shared/ui/button-sheet";
import { ChatHub } from '@/widgets/chat-hub';
import { ThemeToggle } from '@/features/theme-toggle';

export default function HomePage() {

    return (
        <div className='h-full flex flex-col gap-4'>
            <header className='flex justify-between p-4'>
                <ButtonSheet
                    buttonIcon={<Menu />}
                    buttonSize="sm"
                    buttonVariant="default"
                    sheetSide="left"
                    sheetContent={<NavigationMenu />}
                />
                <ThemeToggle />
            </header>
            <main className='flex-1'>
                <ChatHub />
            </main>
        </div>
    )
}






