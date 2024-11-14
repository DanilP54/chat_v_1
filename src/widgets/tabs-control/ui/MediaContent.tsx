import { TabsContent } from "@/shared/ui/tabs";

type MediaContantProps = {
  trigger: string;
};

export default function MediaContant({ trigger }: MediaContantProps) {
  return (
    <TabsContent className="w-full flex-1 h-full" value={trigger}>
      <h1>Media</h1>
    </TabsContent>
  );
}
