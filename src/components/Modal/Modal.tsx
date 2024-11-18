import React, { Dispatch, SetStateAction } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { Input } from '../ui/input';

type TModalProps = {
  reason: string;
  inputValue: string;
  handleInputChange: () => void;
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  handleEdit: (id: string) => void;
  handleSaveChange: () => void;
};

const Modal = ({
  reason,
  inputValue,
  handleInputChange,
  openModal,
  setOpenModal,
  // handleEdit,
  handleSaveChange,
}: TModalProps) => {
  alert(reason);
  return (
    <>
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogTrigger asChild className="w-full text-end my-5">
          <Button
            variant={'default'}
            className="rounded-full h-[50px] w-[50px] p-0"
            // onClick={() => handleEdit(todoId)}
          >
            <Plus className="add-btn" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Todo title</DialogTitle>
          </DialogHeader>
          <div>
            <label htmlFor="change-title">Todo title</label>
            <Input
              id="change-title"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
          <DialogFooter className="md:justify-center">
            <Button className="w-1/2" onClick={handleSaveChange}>
              Save change
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Modal;
