export const saveLocalStrorage=(key,value)=>{
    localStorage.setItem(key,value);
};
export const getLocalStrorage=(key)=>{
    return localStorage.getItem(key);
};
export const removeLocalStrorage=()=>{
    localStorage.clear();
};
export const logout=()=>{
    removeLocalStrorage();
    setTimeout(()=>{
        window.location.href="/signin";
    },500);
}