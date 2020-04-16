const setUser = (user) => {
    return {
        type: 'USER', 
        payload:user         
    };
};

export default setUser