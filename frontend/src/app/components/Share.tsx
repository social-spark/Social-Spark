import shareicon from "../images/shareicon.png"
import Image from "next/image";

export function Share() {
    return (
        <div className="relative">
        <button type="button" className="hover:bg-[#00C1FF] rounded-full size-6 transform rotate-90 absolute top-[1.5rem] right-[0.5rem]">
            <Image src={shareicon} alt="share icon"/>
        </button>
        </div>
    );
}

















