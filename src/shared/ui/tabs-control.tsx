import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/_components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/_components/ui/tabs'


const UserDetailsAccordeoin = () => {
    return (
        <div className='flex flex-col gap-3 h-full items-center'>
            <div className='w-full h-full'>
                <Tabs defaultValue="settings" className="w-full h-full flex flex-col justify-center items-center">
                    <TabsList className="w-4/5 bg-transparent border-none flex gap-8" >
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                        <TabsTrigger value="media">Media</TabsTrigger>
                        <TabsTrigger value="files">Files</TabsTrigger>
                    </TabsList>
                    <TabsContent className='w-full flex-1 h-full' value="settings">
                        <Card>
                            <CardHeader>
                                <CardTitle>Settings</CardTitle>
                                <CardDescription>

                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">

                            </CardContent>
                            <CardFooter>

                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent className='w-full flex-1' value="media">
                        <Card>
                            <CardHeader>
                                <CardTitle>Media</CardTitle>
                                <CardDescription>

                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">

                            </CardContent>
                            <CardFooter>

                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent className='w-full flex-1' value="files">
                        <Card>
                            <CardHeader>
                                <CardTitle>Files</CardTitle>
                                <CardDescription>

                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">

                            </CardContent>
                            <CardFooter>

                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default UserDetailsAccordeoin