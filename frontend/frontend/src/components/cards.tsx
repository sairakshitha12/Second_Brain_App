import { DeleteIcon } from "../icons/deleteIcon";
import { ShareIcon } from "../icons/shareicon";
import { formatDateTime } from "../utils/date";
import { Youtube, Twitter, FileText, Link as LinkIcon, StickyNote } from "lucide-react";

interface CardProps {
  contentid: string;
  title: string;
  link?: string;
  type: "twitter" | "youtube" | "note" | "link";

  createdAt?: string;
  onDelete: (_id: string) => void;
}

export function Card({ contentid, title, link, type, onDelete, createdAt }: CardProps) {
  const renderTypeIcon = () => {
    switch (type) {
      case "youtube":
        return <Youtube className="text-red-500" size={25} />;
      case "twitter":
        return <Twitter className="text-blue-500" size={25} />;
      case "link":
        return <LinkIcon className="text-green-500" size={25} />;
      case "note":
        return <StickyNote className="text-yellow-500" size={25} />;
      default:
        return <FileText className="text-gray-500" size={25} />;
    }
  };
  return (
    <>
      <div>
        <div className="p-6 
 bg-white rounded-lg shadow-md outline-slate-200
 border-gray-200 border min-w-40 min-h-32 max-w-72 ">
          <div className="flex justify-between">
            <div className="flex items-center font-medium  text-gray-600">
              <div className="pr-2">
                {renderTypeIcon()}
              </div>
              {title}
            </div>

            <div className="flex items-center text-gray-600">
              {type !== "note" && link && (
                <div className="pr-2" >
                  <a href={link} target="_blank" rel="noreferrer">
                    <ShareIcon />
                  </a>
                </div>
              )}
              <button onClick={() => onDelete(contentid)} className="hover:text-red-500">
                <DeleteIcon /></button>

            </div>
          </div>
          <div className="mt-3 ">
            {type === "youtube" && link &&
              (<iframe className="w-full rounded-2xl "
                src={link.replace("watch", "embed").replace("?v=", "/")} title="YouTube video player"
                frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>)}
            {type === "twitter" && link && (
              <blockquote className="twitter-tweet">
                <a href={link.replace("x.com", "twitter.com")} target="_blank" rel="noreferrer"></a>
              </blockquote>)}
            {type === "link" && link && (
              <a href={link} target="_blank" rel="noreferrer" className="text-blue-600 underline truncate block">
                {link}
              </a>
            )}

            {type === "note" && link && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-gray-800 shadow-sm">
                <p className="whitespace-pre-wrap">{link}</p>
              </div>
            )}

          </div>
           <div className="pt-2">
              {createdAt && (
                <span className="text-s text-gray-500 font-semibold">
                  {"CreatedAt: "+formatDateTime(createdAt)}
                </span>
              )}
            </div>
          {/* <div className="flex flex-col mt-2 text-sm text-gray-500">
            {createdAt && (
              <span className="text-xs text-gray-500" title={createdAt}>
             {formatDateTime(createdAt)}
              </span>
            )}
              
          
          </div> */}

        </div>
      </div>
    </>
  )
} 