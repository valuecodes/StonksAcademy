import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MaterialIcon from './MaterialIcon';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        color:'black',
    },
    icon:{
        height:25,
        width:25,
        marginLeft:'auto',
        marginRight:10,
        color:'var(--secondary-color)'
    },
    text:{
        fontSize:'40!important',
        '& span':{fontSize:'1.6rem!important'},
    }
}));

export function ListSmall({list}) {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <List component="nav" aria-label="list">
            {list.map((item,index) =>
                <ListItem key={index}>
                    <ListItemText className={classes.text} primary={item.header} />            
                    <ListItemIcon>
                    <MaterialIcon className={classes.icon}  icon={item.icon}/> 
                    </ListItemIcon>
                </ListItem>                
            )}
        </List>
      </div>
    );
  }