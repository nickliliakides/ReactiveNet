import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/store';
import { Modal, ModalContent } from 'semantic-ui-react';

const AppModal: FC = () => {
  const {
    modalStore: { modal, closeModal },
  } = useStore();

  return (
    <Modal open={modal.open} onClose={closeModal} size='mini'>
      <ModalContent>{modal.body}</ModalContent>
    </Modal>
  );
};

export default observer(AppModal);
