import { client } from "@/sanity/lib/client"; //this is helper to query our sanity cms
import Header from "../components/Header";
import { Post } from "../utils/interface";
import PostComponent from "../components/PostComponent";

async function getPosts() {
  const query = `
  *[_type == "post"] {
    title,
    slug,
    publishedAt,
    excerpt,
    body
  }
  `;
  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const posts: Post[] = await getPosts(); //this is where we get the data from sanity

  return (
    <div>
      <Header title="Articles" />
      <div>
        {posts &&
          posts.map((post) => {
            return <PostComponent key={post?._id} post={post} />;
          })}
      </div>
    </div>
  );
}
