import Image from "next/image";
import Tag from "./Tag";
import Time from "./Time";
import Link from "next/link";

const Boxy = (props) => {

    if (props.title === null) {
        return (
            <div className=" flex flex-col items-center border border-transparent border-b-gray-200 pb-1">
                <Image src={'https://i.imgur.com/PHel0m0.jpeg'} height={300} width={300} className=" rounded-xl" alt="BoxyError" />
                <h1 className="text-xl font-black mt-2">No blog found!</h1>
                <p className="text-sm mb-2">Perhaps the owner should post some more...</p>
            </div>
        )
    }

    return (
        <div>
            <Link href={`/blogs/${props.id}`}>
            <Image src={props.image} height={300} width={300} className=" rounded-xl" alt="BoxyImage" />
            <div className=" w-72 mb-3 group">
                <h2 className=" text-xl font-black my-2 mr-2 group-hover:text-indigo-500">{props.title} <Tag tags={props.tag} /> </h2>
                <p>{props.desc.substring(0,70) + "..."}</p>
                <div className="flex justify-between">
                    <p className="mt-3 text-gray-500 text-sm">Written by {props.author}</p>
                    <p className="mt-3 text-gray-500 text-sm"><Time tstamp={props.created_at} notime={true} /></p>
                </div>
                <hr className="mt-3" />
            </div>
            </Link>
        </div>
    );
}
 
export default Boxy;