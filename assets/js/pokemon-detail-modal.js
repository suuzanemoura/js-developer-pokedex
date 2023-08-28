const closeModal = (event) => {
  if (event.target == modal) {
    modal.classList.remove("active");
  }
};

const closeModalButton = () => {
  modal.classList.remove("active");
};

const tabActive = (id) => {
  document.querySelector(".tabs .tab-active").classList.remove("tab-active");
  document.querySelector(id).parentElement.classList.add("tab-active");
};
