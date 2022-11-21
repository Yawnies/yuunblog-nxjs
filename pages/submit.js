import db from '../components/firebase.js';
import supabase from "../components/supabase";
import Head from 'next/head';
import Router from 'next/router';

const Submit = () => {

    const onSbm = async (evt) => { // sends to firebase
        evt.preventDefault();

        const now = new Date();
        const nowConv = now.getTime();
        
        const sentObject = {
            title: `${evt.target.title.value.trim()}`,
            author: `${evt.target.author.value.trim()}`,
            sdesc: `${evt.target.sdesc.value.trim()}`,
            content: `${evt.target.content.value.trim()}`,
            tag: `${evt.target.tags.value.trim()}`,
            image: `${evt.target.image.value.trim()}`,
            created_at: `${nowConv}`
        }

        try {

            await supabase
                .from('blogdata')
                .insert(sentObject)

            // await addDoc(collection(database, 'blogdata'), sentObject);
            console.log("Successfully added to database.");
            submitform.reset();
            Router.push("/");

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
        <Head>
            <title>Submit a Blog | Yuun's Bloggie</title>
        </Head>
        <div className=''>
            <h1 className='text-2xl my-4'>Submit a Blog Post</h1>
            <form className='flex flex-col' id="submitform" onSubmit={onSbm}>
                <label className=' text-lg font-bold my-2'>Blog Title</label>
                <input type="text" id='title' placeholder="title" required className='border border-gray-400 rounded-xl p-2 w-60' maxlength="50" />
                <label className=' text-lg font-bold my-2'>Author</label>
                <input type="text" id='author' placeholder="author" required className='border border-gray-400 rounded-xl p-2 w-60' maxlength="25"/>
                <label className=' text-lg font-bold mt-2'>Image</label>
                <label className=' text-sm mb-2'>Displayed in the blog header, banner, etc. Try to use reasonable image sizes (1920x1080 or variations thereof). <s><span className='font-extrabold'>Must</span> be an Imgur link.</s></label>
                <input type="url" id='image' placeholder="image" required className='border border-gray-400 rounded-xl p-2 w-60'/>
                <label className=' text-lg font-bold mt-2'>Short Description</label>
                <label className=' text-sm mb-2'>This will be displayed inside the banner and box elements.</label>
                <input type="text" id='sdesc' placeholder="short description" required className='border border-gray-400 rounded-xl p-2 mr-96' maxlength="300" />
                <label className=' text-lg font-bold my-2'>Blog Content</label>
                <textarea name="" id="content" cols="30" rows="10" placeholder="content" required className='border border-gray-400 rounded-xl p-2'></textarea>
                <label className=' text-lg font-bold mt-2'>Tag</label>
                <label className=' text-sm mb-2'>Used for identifying and filtering posts.</label>
                <select name="tags" id="tags" className='border border-gray-400 rounded-xl p-2 w-fit'>
                    <option value="gaming">Gaming</option>
                    <option value="anime">Anime</option>
                    <option value="misc">Misc</option>
                </select>
                <button type="submit" className='rounded-xl p-2 w-fit bg-indigo-200 hover:bg-indigo-400 self-center my-2 '>submit</button>
            </form>
        </div>
        </>
    );
}
 
export default Submit;