import Modal from "@material-ui/core/Modal";
import SignIn from "./signIn";

const SigninModal = (props) => {
  return (
    <Modal
      open={props ? props.openModal : false}
      onClose={() => props.setOpenModal(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className="signinModal"
    >
      <SignIn />
    </Modal>
  );
};

export default SigninModal;
