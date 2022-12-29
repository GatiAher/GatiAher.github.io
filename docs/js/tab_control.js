function openTab(evt, name) {
  // Declare all variables
  var i, tab_panel, tab_button;

  // Hide all tab panels
  tab_panel = document.getElementsByClassName("experience-styled-tab-panel");
  for (i = 0; i < tab_panel.length; i++) {
    tab_panel[i].style.display = "none";
  }

  // Remove active class from all tab buttons
  tab_button = document.getElementsByClassName("experience-styled-tab-button");
  for (i = 0; i < tab_button.length; i++) {
    tab_button[i].className = tab_button[i].className.replace(" active", "");
  }

  // Given event of tab_button and name of tab_panel
  // Add active class to given tab_button
  // Show given tab_panel
  document.getElementById(name).style.display = "block";
  evt.currentTarget.className += " active";
}
