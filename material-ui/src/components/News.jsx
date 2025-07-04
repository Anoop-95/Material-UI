import React, {useState, useEffect} from 'react'
import NewsItem from './NewsItem'
import { Box } from '@mui/material'
import Loading from './Loading'
import { useNavigate } from 'react-router-dom';
import { driver } from "driver.js";
import "driver.js/dist/driver.css";



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

  const StoredUser = localStorage.getItem("user");
  const storedTour  = localStorage.getItem("Tourcomp");
  const parsedTour = storedTour ? JSON.parse(storedTour) : null;
  const isExpired = !parsedTour || Date.now() > parsedTour.expiresAt;

  if (StoredUser && isExpired) {
      const drive = driver({
        animate: true,
        showProgress: true,
        allowClose: false,
        popoverClass: 'driverjs-theme',
        steps: [
          {
            element: "#select-bar",
            popover: {
              title: 'Select the category',
              description: 'Select your desired category news ',
              position: 'top'
            }
          },
          {
            element: '#link-btn',
            popover: {
              title: 'Share Your News',
              description: 'copy the link and share with others',
              position: 'top'
            }
          },
          {
            element: '#save-btn',
            popover: {
              title: 'Bookmark it',
              description: 'Save your articles to read later.',
              position: 'top'
            }
          },
          {
            element: '#saved-page',
            popover: {
              title: 'Read later',
              description: 'Your Bookmarked news will be saved here.',
              position: 'left'
            }
          },
          {
            element: '#user-avatar',
            popover: {
              title: 'Logout',
              description: 'Click on the Avatar icon and select the Logout option to end the session.',
              position: 'top'
            }
          },
          {
            popover: {
              title: 'Enjoy Reading 😊',
              position: 'center'
            }
          }
        ]
      });

      setTimeout(() => {
      drive.drive();
      const expiry = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem('Tourcomp', JSON.stringify({ value: true, expiresAt: expiry }));
    }, 1500);
    }

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
