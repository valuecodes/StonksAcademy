import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export const snackBarStyle = {
    variantSuccess: { 
      backgroundColor: "var(--positive-color) !important" , 
      color:"var(--text-dark) !important",
      fontSize:15
    },
    variantError: { 
      backgroundColor: "var(--negative-color) !important" , 
      color:"var(--text-dark) !important",
      fontSize:15
    },
    variantWarning: { 
      backgroundColor: "var(--neutral-color) !important" , 
      color:"var(--text-dark) !important",
      fontSize:15
    },
    info: { 
      backgroundColor: "var(--positive-color) !important" , 
      color:"var(--text-dark) !important",
      fontSize:15
    },
    close:{
        margin:0,
        padding:0        
    },
    closeIcon:{
        fontSize:30,
    }
}

export const snackBarOptions=(classes,ref)=>{
    const onClickDismiss = key => () => { 
        ref.current.closeSnackbar(key);
    } 
    return{
        action:(key) => (
        <IconButton
            aria-label="close"
            color="inherit"
            size='medium'
            className={classes.close}
            onClick={onClickDismiss(key)}
        >
            <CloseIcon className={classes.closeIcon} size='large'/>
        </IconButton>
      ),
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