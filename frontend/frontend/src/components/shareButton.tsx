import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { Button } from "./button";
import { ShareIcon } from "../icons/shareicon";

export function ShareBrain() {
    const [shareLink, setShareLink] = useState(false);
    const [shareUrl, setShareUrl] = useState<string | null>(null);

    async function ToggleShare() {
        try {
            const res = await axios.post(
                `${BACKEND_URL}/api/v1/brain/share`,
                { share: !shareLink },
                { headers: { Authorization: localStorage.getItem("token") } }
            );

            let link = null;

            if (res.data.hash) {
                // case: existing link
                link = `${BACKEND_URL}/api/v1/brain/${res.data.hash}`;
            } else if (res.data.msg) {
                // case: new link
                link = `${BACKEND_URL}${res.data.msg}`;
            }

            if (link) {
                setShareLink(true);
                setShareUrl(link);
            } else {
                setShareLink(false);
                setShareUrl(null);
            }
        } catch (err) {
            console.error("Error sharing brain:", err);
        }
    }

    return (
        <div>
            <Button
                onClick={ToggleShare}
                startIcon={<ShareIcon />}
                size="sm"
                variant="primary"
                text={shareLink ? "Stop Sharing" : "Share Brain"}
            >

            </Button>

            {shareLink && shareUrl && (
                <div className="mt-2 max-w-[420px]">
                    <p className="text-gray-700">Your link:</p>
                    <a href={shareUrl} target="_blank"
                     rel="noopener noreferrer"
                      className="text-blue-500 underline break-all" >
                        {shareUrl}
                    </a>
                </div>
            )}
        </div>
    );
}
