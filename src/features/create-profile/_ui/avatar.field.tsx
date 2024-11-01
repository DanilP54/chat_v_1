import { Button } from "@/shared/ui/button.tsx";
import { UserAvatar } from "@/entities/user/_ui/user.avatar";
import { convertFileToUrl } from "../_lib/convert.file.to.url";
import { selectFile, validateFileSize } from "@/shared/lib/file";
import { AVATAR_MAX_SIZE } from "../_constants";

export default function AvatarField({
  value,
  onSuccess,
  onError,
}: {
  value: File | null;
  onSuccess: (value?: File) => void;
  onError?: (type?: "big-size") => void;
}) {
  const handleFileSelect = async () => {
    const file = await selectFile("image/*");

    if (!validateFileSize(file, AVATAR_MAX_SIZE)) {
      return onError?.("big-size");
    }

    return onSuccess(file);
  };

  return (
    <>
      <Button
        variant={"ghost"}
        onClick={handleFileSelect}
        type="button"
        className="w-[100px] h-[100px] p-0.5 rounded-full relative block hover"
      >
        <UserAvatar className="w-full h-full" url={convertFileToUrl(value)} />
      </Button>
    </>
  );
}
