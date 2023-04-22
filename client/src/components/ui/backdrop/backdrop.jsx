import React, {useState} from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function SimpleBackdrop(props) {
  const { spinner, style={}, children } = props
  if (style.opacity) {
    style.backgroundColor = `rgba(0, 0, 0, ${style.opacity})`
  }
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, ...style }}
        open={open}
      >
        <div className="backdrop-text" style={{color:"inherit", position:"absolute",top:'10%'}}>
          {
            children && children
          }
          {
            spinner && <CircularProgress color="inherit" />
          }
          <div style={{textAlign:'center'}} onClick={handleClose}><br />CLOSE</div>
        </div>
      </Backdrop>
    </div>
  );
}