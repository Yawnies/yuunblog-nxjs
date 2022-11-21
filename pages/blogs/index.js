import supabase from "../../components/supabase";
import Link from "next/link";
import Image from "next/image";
import Tag from "../../components/Tag";
import Head from "next/head";

export const getStaticProps = async () => {

    const {data, error} = await supabase
        .from('blogdata')
        .select()
        .order('id', { ascending: false });

    const dataArr = data;
    const jsoned = JSON.stringify(dataArr);

    return {
        props: { blogs: jsoned }
    }
}

const Blogs = ({ blogs }) => {


    const dateConvert = (timestamp) => {
        const date = new Date(timestamp); // necessary because Date uses MILLISECONDS instead of seconds
        return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}, ${(date.getHours() < 10 ? '0' : '') + date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`;
        // keep in mind the solution for displaying hours and minutes over there!
    }

    const blogarr = JSON.parse(blogs);

    return (
        <>
        <Head>
            <title>All Blogs | Yuun's Bloggie</title>
        </Head>
        <div>
            <h1 className="text-2xl my-4">All Blogs</h1>
            {blogarr.map(doc => (
                    <Link href={`/blogs/${doc.id}`}>
                        <div key={doc.id} className=" group flex justify-between rounded-xl mb-2 p-5 border border-l-4 hover:border-l-4 hover:border-l-indigo-500 relative overflow-hidden">
                            <div className="flex items-center">
                                <div>
                                    <h3 className=" font-bold group-hover:text-indigo-500">{doc.title}</h3>
                                    <p>Written by <span className=" font-semibold">{doc.author}</span> | {dateConvert(doc.created_at)}</p>
                                </div>
                                <div className="ml-4">
                                    <Tag tags={doc.tag} />
                                </div>
                            </div>
                            <Image src={doc.image} height={300} width={300} className="flex absolute right-0 top-0" />
                        </div>
                    </Link>
            ))}
        </div>
        </>
    );
}
 
export default Blogs;

//supabase : V1oVhXhm4w9AIRq0
// gradient bg-gradient-to-t from-black/75

// title: null,
//       author: null,
//       sdesc: null,
//       content: null,
//       tag: null,
//       image: null,
//       created_at: null