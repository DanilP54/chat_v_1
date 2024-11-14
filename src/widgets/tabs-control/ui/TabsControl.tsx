import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import MediaContent from "./MediaContent";

export default function TabsControl() {
  return (
    <div className="flex flex-col gap-3 h-full items-center">
      <div className="w-full h-full">
        <Tabs defaultValue="media" className="w-full h-full">
          <TabsList className="w-full bg-transparent border-none flex justify-center gap-8">
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
          </TabsList>
          <MediaContent trigger={"media"} />
        </Tabs>
      </div>
    </div>
  );
}
