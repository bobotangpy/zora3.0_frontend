import Modal from "@material-ui/core/Modal";
import SignIn from "./signIn";

const SigninModal = React.forwardRef((props, ref) => {
  return (
    <Modal
      ref={ref}
      open={props ? props.openModal : false}
      onClose={() => props.setOpenModal(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className="signinModal"
    >
      <SignIn />
    </Modal>
  );
});

export default SigninModal;
