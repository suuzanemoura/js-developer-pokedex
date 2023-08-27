const closeModal = (event) => {
  if (event.target == modal) {
    modal.classList.remove("active");
  }
};

const closeModalButton = () => {
  modal.classList.remove("active");
};
