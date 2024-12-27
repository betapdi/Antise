import React from 'react'
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const PopupDialog = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (props.content.onConfirm) {
      props.content.onConfirm(); // Call the passed callback function if provided
    }
    props.handleClose();
    navigate(props.content.link);
  }

  return (
    <Dialog open={props.isOpen} onClose={props.handleClose}>
      <DialogTitle className="text-center bg-blue/20">
        {props.content.title}
      </DialogTitle>

      <DialogContent className="mx-auto space-y-4 mt-3">
        <div>{props.content.content}</div>
        <button className="w-full rounded-sm bg-blue text-white py-3 flex items-center justify-center"
          onClick={handleClick}
        >
          <div className=" text-white text-base font-semibold font-inter leading-normal mr-2">
            {props.content.buttonLabel}
          </div>
        </button>
      </DialogContent>
    </Dialog>
  )
}

export default PopupDialog