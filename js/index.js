window.addEventListener("DOMContentLoaded", () => {
  //  modal

  const requestButton = document.querySelector("[data-modal]"),
    requestModal = document.querySelector(".modal__request"),
    modalCloseBtn = document.querySelector(".close-modal");

  requestButton.addEventListener("click", showModal);
  modalCloseBtn.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && requestModal.classList.contains("show")) {
      closeModal();
    }
  });

  requestModal.addEventListener("click", (e) => {
    if (
      e.target === requestModal ||
      e.target.getAttribute("data-close") === ""
    ) {
      closeModal();
    }
  });

  function showModal() {
    requestModal.classList.add("show");
    requestModal.classList.remove("hide");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    requestModal.classList.add("hide");
    requestModal.classList.remove("show");
    document.body.style.overflow = "";
  }
  //  ..........................................
  //  Form

  const form = document.querySelector("form"),
    modalAnswer = document.querySelector(".modal__answer"),
    modalNegative = document.querySelector(".modal__answer-negative");

  modalAnswer.addEventListener("click", (e) => {
    if (e.target === modalAnswer || modalAnswer.classList.contains("show")) {
      modalAnswer.classList.remove("show");
      modalNegative.classList.remove("show");
    }
  });

  postData(form);

  function postData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(form);

      const object = {};

      formData.forEach((value, key) => {
        object[key] = value;
      });

      fetch("server.php", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(object),
      })
        .then((data) => data.text())
        .then((data) => {
          console.log(data);
          modalAnswer.classList.add("show");
          showAnswer(modalAnswer);
        })
        .catch(() => {
          modalNegative.classList.add("show");
          showAnswer(modalNegative);
        })
        .finally(() => {
          form.reset();
        });

      function showAnswer(modal) {
        closeModal();
        setTimeout(() => {
          modal.remove();
        }, 2000);
      }
    });
  }
});
