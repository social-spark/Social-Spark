import liked from "@/app/images/liked.png";
import Image from "next/image";
import { useState } from "react";

export function Like() {
    const [like, setLike] = useState(0);
    const [isLike, setIsLike] = useState(false);

    let onLikeButtonClick = () => {
        setLike(like + (isLike ? -1 : 1));
        setIsLike(!isLike);
    };

    return (
        <button className="float-right pr-10">
            <br/>
            <Image className="hover:bg-[#42AEEE] rounded-full size-6" src={liked} alt="liked icon" onClick={onLikeButtonClick}/>
            <p>{like}</p>
        </button>
    );
}