import {createContext, useState} from "react";

const FavourateContext = createContext({
  favourates: [],
  totalFavourates: 0,
  addFavourate: (favouriteMeetup) => {},
  removeFavourate: (meetupId) => {},
  itemIsFavourate: (meetupId) => {},
});

export function FavourateContextProvider(props) {
    const [userFavourates, setUserFavourates] = useState([]);

    function addFavourateHandler(favouriteMeetup) {
        setUserFavourates((prevUserFavourates) => {
            return prevUserFavourates.concat(favouriteMeetup);
        })
    }
    
    function removeFavourateHandler(meetupId) {
        setUserFavourates((prevUserFavourates) => {
            return prevUserFavourates.filter(meetup => meetup.id !== meetupId);
        })
    }
    function itemIsFavourateHandler(meetupId) {
        return userFavourates.some(meetup => meetup.id === meetupId);
    }
    const context = {
        favourates: userFavourates,
        totalFavourates: userFavourates.length,
        addFavourate: addFavourateHandler,
        removeFavourate: removeFavourateHandler,
        itemIsFavourate: itemIsFavourateHandler
    };

    return <FavourateContext.Provider value = {context}>
        {props.children}
    </FavourateContext.Provider>
}

export default FavourateContext