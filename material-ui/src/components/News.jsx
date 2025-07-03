import React, {useState, useEffect} from 'react'
import NewsItem from './NewsItem'
import { Box } from '@mui/material'
import Loading from './Loading'
import { useNavigate } from 'react-router-dom';


const News = ({ category }) => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [load, setLoad] = useState(true);
  
  const UNWANTED_SOURCES = ["mb.com.ph", "newswise.com"];

   
useEffect(() => {
  const user = localStorage.getItem("user");
  if(!user){
    navigate('/login')
    return;
  }
  
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const now = new Date();
    if (now > storedUser.expiresAt) {
      localStorage.removeItem("user");
      
      navigate("/login");
      toast.error("Your session expired")
      return;
    }

   

  const fetchNews = async () => {
    setLoad(true);
    try {
      const response = await fetch(
        `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&max=50&apikey=${import.meta.env.VITE_API_KEY}`, 
        {
          headers: {
            "Accept": "application/json",
          },
        }
      );  

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const filteredArticles = data.articles.filter(article => {
      return !UNWANTED_SOURCES.some(domain => article.source.url.includes(domain));
      });

      console.log("Filtered Articles:", filteredArticles);
      console.log(data.articles);
      if (!filteredArticles) throw new Error("No articles found.");

       setArticles(filteredArticles);
      
      
    } catch (error) {
      console.error("Error fetching news:", error);
      console.error("Error fetching articles:", error);
      setArticles([]);
    }finally {
        setLoad(false);
    }
  };

  fetchNews();
}, [category, navigate])

  

  return (
    <>
    <Box>
      {load ? (<Loading/>) :(
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, width: '100%' }}>
          {articles.map((article, index) => (
            <NewsItem

            key={article.url}
            title={article.title}
            description={article.description}
            content={article.content}
            image={article.image}
            url={article.url}
            source={article.source.name}
            category={category}
           />
          ))}
        </Box>

      
      </Box>
      )}
    </Box>

    
    </>
   
  );
    
}

export default News
