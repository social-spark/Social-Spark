import Image from "next/image"
import cardTopImage from "@/app/images/card-top.jpg"
import {Like} from "@/app/components/Like";
import {Share} from "@/app/components/Share";


export function Post () {
    return (
        <div className="max-w-screen-lg rounded overflow-hidden bg-white mx-auto shadow-lg my-10 border border-slate-950">
            <Image className="w-full" src={cardTopImage} alt="Sunset in the mountains"/>
                <div className="px-6 py-4 ">
                    <div className="font-bold mb-2">user_name</div>
                    <div className="font-bold mb-2">#prompt</div>
                    <p className="text-gray-700 text-base">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                    </p>
                </div>

            <Like/>

            <Share/>

        </div>
    )
}