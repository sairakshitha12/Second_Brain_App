import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./button";
import { Input } from "./input";
import axios from "axios";
import { BACKEND_URL } from "../config";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter",
    Link = "link",
    Note = "note"
}

export function AddContent({ open, onClose, onContentAdded }) {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube);


    async function addContent() {
        const title = titleRef.current.value || "";
        const link = linkRef.current.value || "";
        await axios.post(BACKEND_URL + "/api/v1/content", {
            link,
            type,
            title,
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        });
        if (onContentAdded) onContentAdded();
        onClose();

    }
    return <div>
        {open && <div className="w-screen h-screen
         bg-slate-600/60 fixed left-0 right-0 top-0  flex justify-center">
            <div className="flex flex-col justify-center ">
                {/* <div className="bg-gray-500 opacity-60 p-6 rounded border border-slate-300"> */}
                <div className="bg-white p-5 rounded-lg shadow-lg w-72 flex flex-col gap-3">

                    <div className="flex justify-end mb-3">
                        <div onClick={onClose} className="cursor-pointer">
                            <CrossIcon />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 pl-2">
                        <Input ref={titleRef} placeholder={"Title"} />
                        {type === ContentType.Note ? (
                            <textarea
                                ref={linkRef as any}
                                placeholder="Write your note....."
                                className="border border-slate-200 rounded p-2 h-24"
                            />
                        ) : (
                            <Input ref={linkRef} placeholder="Link" />
                        )}
                    </div>
                   

                    <div className="">
                        <h1 className="text-center pb-1 font-bold text-lg">Type</h1>
                        <div className="flex gap-3  justify-center">
                            <Button text="youtube" variant={type == ContentType.Youtube ? "secondary" : "primary"}
                                onClick={() => { setType(ContentType.Youtube) }}></Button>
                            <Button text="twitter" variant={type == ContentType.Twitter ? "secondary" : "primary"}
                                onClick={() => { setType(ContentType.Twitter) }}></Button>
                        </div>
                        <div className="mt-3 flex gap-3  justify-center">
                            <Button
                                text="Link"
                                variant={type == ContentType.Link ? "secondary" : "primary"}
                                onClick={() => setType(ContentType.Link)} />
                            <Button
                                text="Note"
                                variant={type == ContentType.Note ? "secondary" : "primary"}
                                onClick={() => setType(ContentType.Note)} />
                        </div>
                    </div>
                    <div className="flex justify-center mt-3">
                        {/* <Button onClick={addContent} size="sm" variant="secondary" text="Submit" /> */}
                        <button onClick={addContent} className="border text-white bg-green-700 px-4 py-2 font-medium rounded">Submit</button>
                    </div>

                </div>
            </div>


        </div>}
    </div>
}
