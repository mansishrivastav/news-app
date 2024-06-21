import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
    const [selectedArticle, setSelectedArticle] = useState(null);
   const [filteredArticles, setFilteredArticles]  = useState([])
   const [favourites, setFavourites] = useState([])

    const headlinesUrl = "https://newsapi.org/v2/top-headlines";
    const categoryUrl = "https://newsapi.org/v2/everything";
    const apiKey = "2a5bbc683bed4a7a8e59ed5d0b3d0017";
    const countries = ['in', 'us', 'nz'];

    //The news cards are shown when the app gets started
    const fetchHeadlines = () => {
        //  An array of promises for each country to fetch headlines
        const request = countries.map((country) => (
            axios.get(`${headlinesUrl}?country=${country}&apiKey=${apiKey}`)
        ));
        axios.all(request)
            .then(responses => {
                const allHeadlines = responses.reduce((acc, response) => {
                    return acc.concat(response.data.articles);
                }, []);
                const allHeadlinesId = allHeadlines.map((articles) => (
                    { ...articles, id: uuidv4() }
                ));
                setArticles(allHeadlinesId);
                setFilteredArticles(allHeadlinesId);
                setTotalPages(Math.ceil(allHeadlinesId.length / 12));
            });
    };

    //The item fetched  array runs only once, after the initial render 
    useEffect(() => {
        fetchHeadlines();
    }, []);

    //Function to fetch articles based on the selected category
    const fetchCategory = (category) => {
        axios.get(`${categoryUrl}?q=${category}&language=en&sortBy=relevancy&apiKey=${apiKey}`)
            .then(response => {
                    // Mapping through the fetched articles and adding a unique ID to each article
                const categoryArticles = response.data.articles.map((articles) => (
                    { ...articles, id: uuidv4() }
                ));
                // Updating the state with the fetched articles
                setArticles(categoryArticles);
                setFilteredArticles(categoryArticles);
                // Calculate and set the total number of pages in pagination
                setTotalPages(Math.ceil(categoryArticles.length / 12));
                // Resetting the selected article 
                setSelectedArticle(null); 
            });
    };

    //Updating the state of change of new page
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    //Updating the state of the next page
    const handleNextClick = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
     //Updating the state of the previous page
    const handlePrevClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    //Search functionality with keywords 

    const handleSearch =(query)=>{
        const filteredList = articles.filter((article)=>{
            const title =article.title?article.title.toLowerCase():" "
            const description =article.description?article.description.toLowerCase():""
            return title.includes(query.toLowerCase())|| description.includes(query.toLowerCase())
           
        })
        setFilteredArticles(filteredList);
        setTotalPages(Math.ceil(filteredList.length/12));
        setCurrentPage(1)
    }
//Adding to favourites
    const addToFavourites =(article)=>{
        const oldFavourites = [...favourites];
        const newFavourites = oldFavourites.concat(article);
        setFavourites(newFavourites)

    }
    //Removing from favourites
    const removeFromFavourites=(id)=>{
    const oldFavourites = [...favourites];
    const newFavourites = oldFavourites.filter((article)=>article.id!==id)
    setFavourites(newFavourites)
    }

    //Logic for pagination
    const preDisabled = currentPage === 1;
    const nextDisabled = currentPage === totalPages - 1;

    const itemsPerPage = 12;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = articles.slice(startIndex, endIndex);
    const filteredItemsToDisplay = filteredArticles.slice(startIndex,endIndex)

    return (
        <Context.Provider
            value={{
                articles,
                itemsToDisplay,
                filteredItemsToDisplay,
                handlePageChange,
                totalPages,
                currentPage,
                handleNextClick,
                handlePrevClick,
                preDisabled,
                nextDisabled,
                fetchCategory,
                setSelectedArticle,
                selectedArticle,
                handleSearch,
                favourites,
                addToFavourites,
                removeFromFavourites
            }}>
            {children}
        </Context.Provider>
    );
}
export default ContextProvider;
