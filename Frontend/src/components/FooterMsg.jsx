import { ChatInput } from "@/components/ui/chat/chat-input"
import { Button } from "@/components/ui/button"
import { CornerDownLeft, FileCheck, Paperclip } from "lucide-react"
import { useRef, useState } from "react";
import { useMyContext } from "@/Provider/Context";
import toast from "react-hot-toast";
import { getOrigin } from "@/config/conf";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const FooterMsg = ({ isClient }) => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const { username, socket, pin } = useMyContext();
  const inputRef = useRef(null);

  // const CHUNK_SIZE = 16 * 1024 /** 16KB */

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!message.trim() && !file) {
      toast.error("Message cannot be empty!");
      return false;
    }
    /** check if file is selected */
    if (file) {
      handleUploadFile(file);
    } else {
      emitMsg()
    }
  };

  const emitMsg = (fileData = "") => {
    socket.emit("sendMessage", {
      message,
      pin,
      username: isClient ? username : "host",
      fileData,
    });
    setMessage("");
    setFile(null);
    // inputRef.current.focus(); // Focus back on the input after sending
  }

  const handleUploadFile = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentCompleted = Math.round((event.loaded * 100) / event.total);
        setProgress(percentCompleted);
        setIsOpen(true);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        setTimeout(() => {
          toast.success("File transfer success!");
          setProgress(0);
          setIsOpen(false);
        }, 1000);
        const { filename } = JSON.parse(xhr.response);
        emitMsg({ fileName: filename, fileType: file.type });
      } else {
        toast.error("File upload failed!");
      }
    };

    let url = getOrigin();
    xhr.open("POST", `${url}/upload-file`, true);
    xhr.send(formData);
  }

  return (
    <div>
      <form
        className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1"
        onSubmit={handleSubmit}
        method="post" encType="multipart/form-data">
        <ChatInput
          placeholder="Type your message here..."
          className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
          value={message}
          onChange={handleInputChange}
          ref={inputRef}
        />
        <div className="flex items-center p-3 pt-0">
          <label htmlFor="file-upload" className="cursor-pointer">
            <Paperclip className="size-4" />
            <span className="sr-only">Attach file</span>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={(e) => {
                // console.log("changed", e.target.files[0]);
                setFile(e.target.files[0])
              }}
            />
          </label>

          {file && <div className="ms-2 w-1/2 overflow-hidden flex items-center gap-x-2 ">
            <FileCheck className="h-4 w-4 shrink-0" />
            <span className="text-xs text-nowrap overflow-hidden text-ellipsis">{file.name}</span>
          </div>}

          <Button
            size="sm"
            className="ml-auto gap-1.5"
          >
            Send Message
            <CornerDownLeft className="size-3.5" />
          </Button>
        </div>
      </form>

      <div>
        <AlertDialog open={isOpen}>
          {/* <AlertDialogTrigger></AlertDialogTrigger> */}
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Uploading</AlertDialogTitle>
              <AlertDialogDescription>
                Sending file... {progress} %
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              {/* <AlertDialogCancel></AlertDialogCancel> */}
              {/* <AlertDialogAction>Continue</AlertDialogAction> */}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

export default FooterMsg

/** chunk method of transfer over socket :: now discarded*/
// const reader = new FileReader();
// let offset = 0;
// /** dynamic chunk size based on file size */
// let CHUNK_SIZE = 16 * 1024 /** 16KB */
// if (file.size > 100 * 1024) {
//   CHUNK_SIZE = 24 * 1024 /** 24KB */
// }
// if (file.size > 500 * 1024) {
//   CHUNK_SIZE = 32 * 1024 /** 32KB */
// }

// reader.readAsArrayBuffer(file);
// reader.onload = async () => {
//   const f = new Uint8Array(reader.result);
//   while (offset < f.length) {
//     const chunk = f.slice(offset, offset + CHUNK_SIZE)
//     emitMsg({ chunk: Array.from(chunk) });
//     offset += CHUNK_SIZE;
//     await new Promise((resolve) => setTimeout(resolve, 50))
//   }
//   emitMsg({ done: true, fileName: file.name, fileType: file.type });
// }
