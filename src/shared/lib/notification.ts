import { useToast } from "../ui/use-toast";

type NotificationMessage = {
    title?: string,
    description?: string
}

export const useNotfication = () => {

    const{ toast} = useToast()
        
    const showNotification = (message: NotificationMessage, type?: 'error', ) => {
        return toast({ 
            title: message.title ?? undefined,
            description: message.description ?? undefined,
            variant: type === 'error' ? 'destructive' : 'default'  
        })
    }

    return {showNotification}    
}