
import Navbar from "@/app/components/navbar"
import axios from "axios"

export async function  generateStaticParams(){
    let article=[]
    try{
        const res=await axios.get("https://newsapi.org/v2/top-headlines?country=us&apiKey=2fcd1980e33349f39008d563f19bff87")
         article=res.data.articles || []
    }catch(err){
    console.error("error fetching data",err)


    }
    return article.map((_, index) => ({ id: index.toString() }));

}
export default async function Articlespage({params}){
  const { id } = await params;
    let article=[]
    try{
        const response= await axios.get("https://newsapi.org/v2/top-headlines?country=us&apiKey=2fcd1980e33349f39008d563f19bff87")
        article=response.data.articles || []
    }catch(err){
        console.error("error",err)
    }
 article = article[id];
  if (!article) return <p>Article not found</p>;
  return (
    <>
    <Navbar/>
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>{article.title}</h1>
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          style={{ width: "100%", maxHeight: "400px", objectFit: "cover", marginBottom: "16px" }}
        />
      )}
      <p>{article.description}</p>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "blue", textDecoration: "underline" }}
      >
        Read full article →
      </a>
    </div>
    
    </>
  
  );


}
