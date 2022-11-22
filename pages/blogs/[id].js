import supabase from "../../components/supabase";
import Tag from "../../components/Tag";
import { useState } from "react";
import Router from "next/router";
import Head from "next/head";

export const getStaticPaths = async () => {

    const { data, error } = await supabase
        .from('blogdata')
        .select();
    
    const paths = data.map(blog => {
        return {
            params: { id: blog.id.toString() }
        }
    });

    return {
        paths,
        fallback: false
    }

}

export const getStaticProps = async (context) => { // behaves as map method

    const id = context.params.id;
    const { data, error } = await supabase
        .from('blogdata')
        .select()
        .eq('id', id);

    const dataArray = data[0]; // needs to be selected since data returns an array containing an object

    return {
        props: { dataArray },
        revalidate: 30,
    }
}


// ----------------------------------------------------------------------------------------------------------------------------- main

const Details = ({ dataArray }) => {

    const [editing, setEditing] = useState(false);

    const dateConvert = (timestamp) => {
        const date = new Date(timestamp); // necessary because Date uses MILLISECONDS instead of seconds
        return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}, ${(date.getHours() < 10 ? '0' : '') + date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`;
        // keep in mind the solution for displaying hours and minutes over there!
    }

    const deleteBlog = async () => {

        const { error } = await supabase
            .from('blogdata')
            .delete()
            .eq('id', dataArray.id);
        
        Router.push("/blogs");
    }

    const enableEdit = (state) => {
        if (state) {
            setEditing(true);
        }
        if (!state) {
            setEditing(false);
        }
    }

    // updates db and refreshes page
    const onEdit = async (evt) => {

        const { error } = await supabase
            .from('blogdata')
            .update( { 
                title: `${evt.target.title.value.trim()}`,
                author: `${evt.target.author.value.trim()}`,
                sdesc: `${evt.target.sdesc.value.trim()}`,
                content: `${evt.target.content.value.trim()}`,
                tag: `${evt.target.tags.value.trim()}`,
                image: `${evt.target.image.value.trim()}`
            })
            .eq('id', dataArray.id);
        enableEdit(false);
    }

    // editing display
    if (editing) {
        return (
            <>
            <Head>
                <title>Editing {dataArray.title} | Yuun's Bloggie</title>
            </Head>
            <div className=''>
                <h1 className='text-2xl my-4'>Editing <span className="font-bold">{dataArray.title}</span></h1>
                <form className='flex flex-col' id="submitform" onSubmit={onEdit}>
                    <label className=' text-lg font-bold my-2'>Blog Title</label>
                    <input type="text" id='title' placeholder="title" required className='border border-gray-400 rounded-xl p-2 w-60' maxlength="50" defaultValue={dataArray.title} />
                    <label className=' text-lg font-bold my-2'>Author</label>
                    <input type="text" id='author' placeholder="author" required className='border border-gray-400 rounded-xl p-2 w-60' maxlength="25" defaultValue={dataArray.author} />
                    <label className=' text-lg font-bold mt-2'>Image</label>
                    <label className=' text-sm mb-2'>Displayed in the blog header, banner, etc. <span className='font-extrabold'>Must</span> be an Imgur link.</label>
                    <input type="url" id='image' placeholder="image" required className='border border-gray-400 rounded-xl p-2 w-60' defaultValue={dataArray.image} />
                    <label className=' text-lg font-bold mt-2'>Short Description</label>
                    <label className=' text-sm mb-2'>This will be displayed inside the banner and box elements.</label>
                    <input type="text" id='sdesc' placeholder="short description" required className='border border-gray-400 rounded-xl p-2 mr-96' maxlength="300" defaultValue={dataArray.sdesc} />
                    <label className=' text-lg font-bold my-2'>Blog Content</label>
                    <textarea name="" id="content" cols="30" rows="10" placeholder="content" required className='border border-gray-400 rounded-xl p-2' defaultValue={dataArray.content}></textarea>
                    <label className=' text-lg font-bold mt-2'>Tag</label>
                    <label className=' text-sm mb-2'>Used for identifying and filtering posts.</label>
                    <select name="" id="tags" className='border border-gray-400 rounded-xl p-2 w-fit'>
                        <option value="gaming">Gaming</option>
                        <option value="anime">Anime</option>
                        <option value="misc">Misc</option>
                    </select>
                <div className="flex justify-center">
                    <button type="submit" className='rounded-xl p-2 w-fit bg-indigo-200 hover:bg-indigo-400 self-center my-2 '>update post</button>
                    <button className='rounded-xl p-2 w-fit bg-indigo-200 hover:bg-indigo-400 self-center my-2 ml-2 ' type="button"  onClick={Router.reload}>back</button>                  
                </div>
            </form>
        </div>
        </>
        );
    }


    // normal display
    return (
        <>
        <Head>
                <title>{dataArray.title} | Yuun's Bloggie</title>
            </Head>
        <div className="flex flex-col">
            <div className="flex justify-between items-center border border-transparent border-b-gray-200 mb-4">
                <div className="flex flex-col">
                    <div className="flex">
                        <Tag tags={dataArray.tag} />
                        <h1 className=" text-3xl font-bold ml-4">{dataArray.title}</h1>
                    </div>
                    <p className="mt-1 mb-3">Written by <span className="font-semibold">{dataArray.author}</span> | {dateConvert(dataArray.created_at)}</p>
                </div>
                <div className="flex">
                    <button className="rounded-md p-2 w-fit bg-indigo-200 hover:bg-indigo-400 self-center ml-2 font-bold" onClick={enableEdit.bind(true)}>Edit</button>
                    <button className="rounded-md p-2 w-fit bg-indigo-200 hover:bg-indigo-400 self-center ml-2 font-bold" onClick={deleteBlog}>Delete</button>
                </div>
            </div>
            <div>
                <div className="whitespace-pre-line">{dataArray.content}</div>
            </div>
        </div>
        </>
    );
}
 
export default Details;