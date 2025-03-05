import React, { useRef, useState } from 'react'
import { ShineBorder } from '@/components/magicui/shine-border'
import { Button } from './ui/button';
import { File, PlusCircle, SendHorizonal } from 'lucide-react';
import { MagicCard } from "@/components/magicui/magic-card";
import { getOrigin } from '@/config/conf';
import toast from 'react-hot-toast';
import { useMyContext } from '@/Provider/Context';
import { Progress } from "@/components/ui/progress"

const AppShineFilesBox = () => {
    const { isServerStart, filesArr, pin, socket } = useMyContext();
    const [selectedFilesArr, setselectedFilesArr] = useState([]);
    const [progressValue, setProgressValue] = useState(false);
    const dropareaRef = useRef(null);

    const handleFileChange = (e) => {
        let filesArr = Array.from(e.target.files);
        filesArr = filesArr.filter((f, i) => f.type !== "");
        setselectedFilesArr(filesArr)
    }

    const handleSendFiles = async () => {
        if (selectedFilesArr.length === 0) {
            toast.error("No files selected!!")
            return false;
        }
        if (selectedFilesArr.length >= 10) {
            toast.error("Too many files. Limit is 10.")
            return false;
        }
        if (!isServerStart) {
            toast.error("Host is not Connected!!")
            return false;
        }
        const formData = new FormData();
        for (const single_file of selectedFilesArr) {
            formData.append('file', single_file)
        }
        let hasLargeFile = false;
        for (let i = 0; i < selectedFilesArr.length; i++) {
            if (selectedFilesArr[i].size > (1024 * 1024 * 10)) { // larger than 10MB
                hasLargeFile = true;
                break;
            }
        }
        if (hasLargeFile) {
            // for large file use xhr method to show progress
            xhrFileUpload(formData, (files) => {
                // on file upload success:
                toast.success("Files uploaded successfully");
                setselectedFilesArr([])
                socket.emit("sendFile", {
                    files,
                    pin,
                });
                setTimeout(() => {
                    setProgressValue(0)
                }, 1000);
            });
            return false;
        }

        // for small size files instant transfer:
        try {
            let url = getOrigin();
            const res = await fetch(`${url}/upload-file`, {
                method: 'POST',
                body: formData
            });
            if (!res.ok) {
                const { error } = await res.json();
                toast.error(error ? error : "Something went wrong!!");
                return false;
            }
            const { files } = await res.json();
            toast.success("Files transfered successfully");
            setselectedFilesArr([])
            socket.emit("sendFile", {
                files,
                pin,
            });
            setTimeout(() => {
                setProgressValue(0)
            }, 1000);
        } catch (error) {
            console.log("ERROR IN FILE UPLOAD:", error);
            toast.error("ERROR IN FILE UPLOAD");
            setProgressValue(0);
        }
    }

    const xhrFileUpload = (formData, callback) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                const percentCompleted = Math.round((event.loaded * 100) / event.total);
                setProgressValue(percentCompleted);
            }
        };

        xhr.onload = () => {
            if (xhr.status === 200) {
                const { files } = JSON.parse(xhr.response);
                callback(files)
            } else {
                toast.error("File upload failed!");
            }
        };
        let url = getOrigin();
        xhr.open("POST", `${url}/upload-file`, true);
        xhr.send(formData);
    }

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropareaRef.current.classList.add('border-4');
        dropareaRef.current.classList.add('border-dashed');
    }
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropareaRef.current.classList.add('border-4');
        dropareaRef.current.classList.add('border-dashed');
    }
    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropareaRef.current.classList.remove('border-4');
        dropareaRef.current.classList.remove('border-dashed');
    }
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropareaRef.current.classList.remove('border-4');
        dropareaRef.current.classList.remove('border-dashed');
        let dt = e.dataTransfer;
        let filesArr = Array.from(dt.files);
        filesArr = filesArr.filter((f, i) => f.type !== "");
        setselectedFilesArr(filesArr);
    }

    return (
        <ShineBorder
            borderWidth={2}
            className="relative w-full h-[80vh] rounded-lg bg-transparent text-white overflow-y-hidden"
            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
        >
            <div className='flex justify-between items-center pb-2'>
                <div className='lg:text-2xl font-semibold flex gap-x-3'>
                    <form>
                        <label htmlFor="fileInput" className='underline cursor-pointer'>Select</label>
                        <input className='hidden' type="file" multiple='multiple' accept='*/*' name='file' id='fileInput'
                            onChange={handleFileChange} />
                    </form>
                    <span>{selectedFilesArr.length > 0 ? `${selectedFilesArr.length} files selected` : "or Drag and drop Files"}</span>
                </div>
                <Button className={"bg-white/90 text-black hover:bg-white"}
                    onClick={handleSendFiles}>
                    Send
                    <SendHorizonal className=' -rotate-45' />
                </Button>
            </div>

            <div ref={dropareaRef} className='w-full h-[70vh] overflow-y-auto ' style={{ scrollbarColor: "#808080 #00000000" }}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {(filesArr && filesArr.length <= 0) && <div className='w-full flex flex-col items-center justify-center'>
                    <PlusCircle className='w-8 h-8' />
                    <span>No file available</span>
                    <span>Drag and drop files</span>
                </div>}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-black">
                    {(filesArr && filesArr.length > 0) && filesArr.map((file, i) => (
                        <MagicCard key={i} className={"rounded-xl"}>
                            <div className='flex items-center justify-center flex-col w-full h-40 overflow-hidden'>
                                <File className='w-6 h-6' />
                                <a href={getOrigin() + "/download/" + file.srcName} className='text-nowrap text-ellipsis'>
                                    {file.fileName.length < 10 ? file.fileName : file.fileName.substring(0, 10) + "... " + file.fileName.substring(file.fileName.lastIndexOf("."), file.fileName.length)}
                                </a>
                            </div>
                        </MagicCard>
                    ))}

                </div>
            </div>

            {(progressValue > 0) && <div className='fixed top-0 left-0 bg-black/50 w-full h-[100vh] flex items-center justify-center px-4'>
                <div className="alertModal bg-white rounded-2xl w-full h-40 flex items-center justify-center flex-col">
                    <Progress className="w-[60%]" value={progressValue} max={100} />
                    <span className='text-black mt-4 text-sm'>Uploading files</span>
                </div>
            </div>}
        </ShineBorder>
    )
}

export default AppShineFilesBox