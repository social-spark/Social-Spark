import profile from '@/app/images/profile.png'
import Image from "next/image";


export default function Share() {
    return (
        <header>
            <div className="box-border h-full w-96 p-4 border-4">
                <Image className="w-20 h-20 rounded-full"  src={profile} alt="profile picture"/>
                <p className="">User Name</p>
                <p className="">Full Name</p>
            </div>
        </header>
    );
}
