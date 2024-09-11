const getCredits = () => {
    // Try to get from localStorage, default to 500 if not present
    return parseInt(localStorage.getItem('credits'));
};

const setCredits = (newCredits) => {
    localStorage.setItem('credits', newCredits);
};

export { getCredits, setCredits };