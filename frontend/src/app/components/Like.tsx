"use client";

import liked from "@/app/images/liked.png";
import Image from "next/image";
import { useState } from "react";

export function Like() {
    const [like, setLike] = useState(0);
    const [isLike, setIsLike] = useState(false);

    const onLikeButtonClick = () => {
        setLike(like + (isLike ? -1 : 1));
        setIsLike(!isLike);
    };

    return (
        <div className="float-right pr-10 text-center">
            <Image
                className="w-6 h-6 cursor-pointer"
                src={liked}
                alt="liked icon"
                onClick={onLikeButtonClick}
            />
            <p>{like}</p>
        </div>
    );
}
