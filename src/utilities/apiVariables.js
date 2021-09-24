export const authAPI ={
    signupUser:{
        method:"post",
        url:"/signup",
    },
    signinUser:{
        method : "post",
        url:"/signin"
    },
    isAuthenticated:{
        method:"get",
        url:"/isAuthenticated",
    },
    getUser:(email)=>({
        method:"get",
        url:"/getuser/"+email,
    }),
    updateProfile:{
        method:"put",
        url:"/edituser",
    },
}