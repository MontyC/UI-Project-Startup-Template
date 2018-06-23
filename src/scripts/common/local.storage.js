import Constants from './constants';

export default class LocalStorage {

    // Retrieve single item of any type added to Local Storage
    static retrieveItem = (key) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            return null;
        }
    }

    static retrieveItemWithExpiration = (key) => {
        try {
            const data = JSON.parse(localStorage.getItem(key));
            return data ? (new Date().getTime() < data.timestamp && data.value) : null;
        } catch (error) {
            return null;
        }
    }

    // Store single item of any type added to Local Storage
    static storeItem = (key, item) => {
        try {
            localStorage.setItem(key, JSON.stringify(item));
        } catch (error) {
            return null;
        }
    }

    static storeItemWithExpiration = (key, item, expiration = 60) => {
        try {
            const expirationMS = expiration * 1000 * 60;
            const data = {
                value: item, 
                timestamp: new Date().getTime() + expirationMS
            };
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            return null;
        }
    }
}