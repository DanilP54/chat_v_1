import { Button } from "@/shared/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
// import { AvatarValueObject } from "@/entities/current-user";
import { TabsControl } from "@/widgets/tabs-control";

export default function ChatDetails() {
  const { state } = useLocation();

  return (
    <div className="h-full flex flex-col justify-between gap-3">
      <header className="flex flex-col p-4 shrink">
        <div className="p-2">
          <Link to={`/chat/${state.prevId}`}>
            <ArrowLeft />
          </Link>
        </div>
        <div className="flex flex-col justify-center items-center mt-7">
          {/* <AvatarValueObject
                        className="w-20 h-20 bg-transparent"
                        src="https://api.dicebear.com/8.x/adventurer/svg?seed=Garfield"
                    /> */}
          <h2 className=" font-mono font-bold text-xl mt-3">Danil Putro</h2>
          <span className="font-mono font-thin text-lg mt-1">
            Lorem ipsi quam ipsa rerum?
          </span>
        </div>
      </header>
      <main className="flex-1">
        <TabsControl />
      </main>
      <footer className="mb-8 m-auto">
        <Button variant="noShadow" className="bg-red-500 border-none">
          Block User
        </Button>
      </footer>
    </div>
  );
}
