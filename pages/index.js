import Banner from "../components/Banner";
import Boxy from "../components/Boxy";
import Head from "next/head";
// import { useState, useEffect } from "react";
// import { collection, query, limit, getDocs, orderBy} from "firebase/firestore";
// import db from "../components/firebase";
import supabase from "../components/supabase";

export const getStaticProps = async () => {

  const {data, error} = await supabase
  .from('blogdata')
  .select()
  .limit(6)
  .order('id', {ascending: false});

  let dataArray = data;

  for (let index = 0; index < 6; index++) {
    if (dataArray[index]) {
      console.log("Confirmed");
    }
    if (typeof dataArray[index] === 'undefined') {
      dataArray.push( {
      title: null,
      author: null,
      sdesc: null,
      content: null,
      tag: null,
      image: null,
      created_at: null
      });
    }
  }

  return {
    props: { blogs: dataArray }
  }
  
}

const Home = ({ blogs }) => {

  const blogsBoxy = blogs.slice(3,6);

  return (
    <>
      <Head>
        <title>Home | Yuun's Bloggie</title>
      </Head>
      <h1 className=" text-2xl my-4">Latest!</h1>
        <div className="flex justify-between">
          <Banner title={blogs[0].title} image={blogs[0].image} desc={blogs[0].sdesc} author={blogs[0].author} tag={blogs[0].tag} created_at={blogs[0].created_at} id={blogs[0].id} />
          <div>
            <Boxy title={blogs[1].title} image={blogs[1].image} desc={blogs[1].sdesc} author={blogs[1].author} tag={blogs[1].tag} created_at={blogs[1].created_at} id={blogs[1].id} />
            <Boxy title={blogs[2].title} image={blogs[2].image} desc={blogs[2].sdesc} author={blogs[2].author} tag={blogs[2].tag} created_at={blogs[2].created_at} id={blogs[2].id} />
          </div>
        </div>
      <h1 className=" text-2xl my-4">Recent Posts</h1>
      <div className="flex justify-between flex-wrap">
        {blogsBoxy.map(blog => {
            return <Boxy title={blog.title} image={blog.image} desc={blog.sdesc} author={blog.author} tag={blog.tag} key={blog.id} created_at={blog.created_at} id={blog.id} />;
          })}
      </div>
    </>
  );
}
 
export default Home;


// const [blogs, setBlogs] = useState(null);

// useEffect(() => {
  //   const blogData = async () => {

  //     try {
  //       const { data, error } = await supabase
  //         .from('blogdata')
  //         .select()
  //         .limit(6)
  //         .order('id', {ascending: false});

  //         const dataArray = data;

  //         for (let index = 0; index < 6; index++) {
  //                 if (dataArray[index]) {
  //                   console.log("Confirmed");
  //                 }
  //                 if (typeof dataArray[index] === 'undefined') {
  //                     dataArray.push( {
  //                       title: null,
  //                       author: null,
  //                       sdesc: null,
  //                       content: null,
  //                       tag: null,
  //                       image: null,
  //                       created_at: null
  //                   });
  //                 }
  //               }

  //         setBlogs(dataArray);


  //     } catch (error) {
  //       console.log(error);
  //     }

  //   }

  //   blogData();
  // }, []);

  // if (blogs === null) {
  //   return (
  //     <div>
  //       <h1>Loading shit...</h1>
  //     </div>
  //   )
  // }
