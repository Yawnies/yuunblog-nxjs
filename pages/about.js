import Image from "next/image";
import Head from "next/head";

const About = () => {
    return (
        <>
        <Head>
                <title>About | Yuun's Bloggie</title>
        </Head>
        <div className="flex flex-col">
            <h1 className=" text-2xl mb-4">About</h1>
            <p>Yuun's Blog is a place where Yuun posts things he likes. But really, 
                it's just an app I've made to test out Next.js and all its features so I can learn how to use it to its fullest extent and then try  
                it out for future projects. So far I've been loving it!
            </p>
            <br />
            <p>Please don't mind the scuffed look c:. I've decided not to bother with fancy CSS in this project as it's not really the 
                focus of what I'm trying to learn. 
            </p>
            <br />
            <Image src="https://i.imgur.com/XE1bBO8.gif" height={500} width={500} className=" rounded-xl self-center" alt="shit" />
        </div>
        </>
    );
}
 
export default About;