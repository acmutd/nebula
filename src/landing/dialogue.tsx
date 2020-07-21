import React from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';


const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);


interface DialogueState{
    open: boolean; 
    display: string; 
}


export default class Dialogue extends React.Component<{}, DialogueState>{

    constructor(props: any){
        super(props);
        this.state = {
            open: false, 
            display: 'Original', 
        }
    }

    render(){

        const handleClickOpen = () => {
        this.setState({
            open: true
            })
        };
        const handleClose = () => {
            this.setState({
                open: false
            })
        };

        const displayDegreePlan = () => {
          console.log('hello')
          this.setState({display: 'degree-plan'})
        }; 

        const displayTransfer = () => {
          this.setState({display: 'transfer'})
        }

        const displayElse = () => {
          this.setState({display: 'else'})
        }

        const showDisplay = () => {
          console.log(this.state.display)
          if(this.state.display == 'degree-plan'){
            return <div>choose your degree plan display</div>
          }
          else if(this.state.display == 'transfer'){
            return <div>import transfer credits display</div>
          }
          else{
            return <div>anything else display</div>
          }
        }

        return(
            <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
              Open dialog
            </Button>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={this.state.open}>
              <AppBar position="static">
                <Typography variant="h5">{this.state.display}</Typography>
                </AppBar>
              <DialogContent dividers>
                {showDisplay()}
              </DialogContent>
              <DialogActions>
                <Button variant="outlined" onClick={displayDegreePlan}> 1</Button>
                <Typography>Choose degree plan</Typography>
                <Button variant="outlined" onClick={displayTransfer}> 2</Button>
                <Typography>Import transfer courses</Typography>
                <Button variant="outlined" onClick={displayElse}> 3</Button>
                <Typography>Everything else</Typography>
                <Button autoFocus onClick={handleClose} color="primary">
                  Finish
                </Button>
              </DialogActions>
            </Dialog>
          </div>          
        )
    }
}

/**
 *               <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                {this.state.display}
              </DialogTitle>
 */
