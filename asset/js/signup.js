var input = document.querySelector("#phone");
    window.intlTelInput(input, {
      separateDialCode: true,
      utilsScript: "./utils.js",
    });