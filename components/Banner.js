import Image from "next/image";
import Tag from "./Tag";
import Link from "next/link";
import Time from "./Time";

const Banner = (props) => {

    if (props.title === null) {
        return (
            <div>
                <Image src={'https://i.imgur.com/PHel0m0.jpeg'} height={667} width={667} alt="shit" />
            </div>
        )
    }

    return (
            <div className="w-4/6">
                <Link href={`/blogs/${props.id}`}>
                    <Image src={props.image} height={667} width={667} className=" rounded-xl max-h-96" alt="BannerImage" />
                </Link>
                <Link href={`/blogs/${props.id}`}>
                <div className=" mt-2 group">
                    <h2 className=" text-2xl font-black mb-2 mr-2 group-hover:text-indigo-500">{props.title} <Tag tags={props.tag} /></h2>
                    <p>{props.desc}</p>
                    <p className="mt-3 text-gray-500 text-sm">Written by {props.author} | <Time tstamp={props.created_at} /></p>
                    <hr className="mt-6" />
                </div>
                </Link>
            </div>
    );
}
 
export default Banner;