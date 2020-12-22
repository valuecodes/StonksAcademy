export const snackBarStyle = {
    variantSuccess: { 
      backgroundColor: "var(--positive-color) !important" , 
      color:"var(--text-dark) !important",
      fontSize:16
    },
    variantError: { 
      backgroundColor: "var(--negative-color) !important" , 
      color:"var(--text-dark) !important",
      fontSize:16
    },
    variantWarning: { 
      backgroundColor: "var(--neutral-color) !important" , 
      color:"var(--text-dark) !important",
      fontSize:16
    },
    info: { 
      backgroundColor: "var(--positive-color) !important" , 
      color:"var(--text-dark) !important",
      fontSize:16
    },
}

export const snackBarOptions=(classes)=>{
    return{
        maxSnack:3,
        anchorOrigin:{
            vertical: 'bottom',
            horizontal: 'right',
        },
        classes:{ 
            variantSuccess:classes.variantSuccess,
            variantError: classes.variantError, 
            variantWarning: classes.variantWarning, 
        }          
    }
} 

export const MuiTheme = {
    typography: {
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      fontSize: 16,
    },
}