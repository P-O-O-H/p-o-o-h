/*
 * Write your client-side JS code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Tarren Meyers
 * Email: meyersta@oregonstate.edu
 */


/*
 * This function should use your Handlebars pot template to generate HTML
 * representing a single pot, given the pot text and author as arguments to
 * the function.  The generated HTML should then be inserted into the DOM at
 * the end of the <main> element whose class is "pot-container".
 *
 * The function currently uses native JS methods to generate a new DOM element
 * representing single pot, given the specified information, and inserts that
 * pot into the DOM.  The new post element has the following structure:
 *
 * <article class="pot">
 *   <div class="pot-icon">
 *     <i class="fas fa-star"></i>
 *   </div>
 *   <div class="pot-content">
 *     <p class="pot-text">
 *       {{text}}
 *     </p>
 *     <p class="pot-author">
 *       <a href="#">{{author}}</a>
 *     </p>
 *   </div>
 * </article>

 */
function insertNewPot(potHostname, potPort, potImg) {


  var potContext={
      hostname:potHostname,
      port:potPort,
      img:potImg,
  };

  var potHTML = Handlebars.templates.pot(potContext);

  var potcon = document.querySelector(".pot-container");
  potcon.insertAdjacentHTML('beforeend',potHTML);

  // // Create a new pot <article> element.
  // var potElem = document.createElement('article');
  // potElem.classList.add('pot');
  //
  // /*
  //  * Create a new pot-icon <div> element, insert bullborn with innerHTML
  //  * (which is safe in this case because we're not dealing with user input),
  //  * and add the div into the new pot element.
  //  */
  // var potIconElem = document.createElement('div');
  // potIconElem.classList.add('pot-icon');
  // potIconElem.innerHTML = '<i class="fa fa-bullhorn"></i>';
  // potElem.appendChild(potIconElem);
  //
  // /*
  //  * Create a new pot-content <div> element, and insert it into the new pot
  //  * element.
  //  */
  // var potContentElem = document.createElement('div');
  // potContentElem.classList.add('pot-content');
  // potElem.appendChild(potContentElem);
  //
  // /*
  //  * Create a new pot-text <p> element and add to it a text node containing
  //  * the pot text value specified by the user.  Add the pot-text <p> element
  //  * into the pot-content element.
  //  */
  // var potTextNode = document.createTextNode(potText);
  // var potTextElem = document.createElement('p');
  // potTextElem.classList.add('pot-text');
  // potTextElem.appendChild(potTextNode);
  // potContentElem.appendChild(potTextElem);
  //
  // /*
  //  * Create a new pot-author <p> element and add to it an <a> element
  //  * that itself contains a text node with the pot author value
  //  * specified by the user.  Add the pot-author <p> element into the
  //  * pot-content element.
  //  */
  // var potAuthorTextNode = document.createTextNode(potAuthor);
  // var potAuthorLinkElem = document.createElement('a');
  // potAuthorLinkElem.href = '#';
  // potAuthorLinkElem.appendChild(potAuthorTextNode);
  // var potAuthorElem = document.createElement('p');
  // potAuthorElem.classList.add('pot-author');
  // potAuthorElem.appendChild(potAuthorLinkElem);
  // potContentElem.appendChild(potAuthorElem);
  //
  // var potContainer = document.querySelector('main.pot-container');
  // potContainer.appendChild(potElem);

}


/***************************************************************************
 **
 ** You should not modify any of the code below.
 **
 ***************************************************************************/

/*
 * This is a global array containing an object representing each pot.  Each
 * pot object has the following form:
 *
 * {
 *   text: "...",
 *   author: "..."
 * }
 */
var allPots = [];

/*
 * This function checks whether all of the required inputs were supplied by
 * the user and, if so, inserts a new pot into the page using these inputs.
 * If the user did not supply a required input, they instead recieve an alert,
 * and no new pot is inserted.
 */
function handleModalAcceptClick() {

  var potHost = document.getElementByName('pot_host_input').value;
  var potPort = document.getElementByName('pot_port_input').value;
  var potImg = document.getElementByName('pot_img_input').value;


  /*
   * Only generate the new pot if the user supplied values for both the pot
   * text and the pot attribution.  Give them an alert if they didn't.
   */
  if (potHost && potPort && potImg) {

    allPots.push({
      hostname: potHost,
      port: potPort,
      img: potImg,
    });

    clearSearchAndReinsertPots();
    //create yaml
    hideCreatePotModal();

  } else {

    alert('You must specify both the text and the port of the pot!');

  }
}


/*
 * This function clears the current search term, causing all pots to be
 * re-inserted into the DOM.
 */
function clearSearchAndReinsertPots() {

  //document.getElementById('navbar-search-input').value = "";
  doSearchUpdate();

}


/*
 * This function shows the modal to create a pot when the "create pot"
 * button is clicked.
 */
function showCreatePotModal() {

  var modalBackdrop = document.getElementById('modal-backdrop');
  var createPotModal = document.getElementById('create-pot-modal');

  // Show the modal and its backdrop.
  modalBackdrop.classList.remove('hidden');
  createPotModal.classList.remove('hidden');

}

function showDeletePotModal() {

  var modalBackdrop = document.getElementById('modal-backdrop');
  var createPotModal = document.getElementById('delete-pot-modal');

  // Show the modal and its backdrop.
  modalBackdrop.classList.remove('hidden');
  createPotModal.classList.remove('hidden');

}


/*
 * This function clears any value present in any of the pot input elements.
 */
function clearPotInputValues() {

  var potInputElems = document.getElementsByClassName('pot-input-element');
  for (var i = 0; i < potInputElems.length; i++) {
    var input = potInputElems[i].querySelector('input, textarea');
    input.value = '';
  }

}


/*
 * This function hides the modal to create a pot and clears any existing
 * values from the input fields whenever any of the modal close actions are
 * taken.
 */
function hideCreatePotModal() {

  var modalBackdrop = document.getElementById('modal-backdrop');
  var createPotModal = document.getElementById('create-pot-modal');

  // Hide the modal and its backdrop.
  modalBackdrop.classList.add('hidden');
  createPotModal.classList.add('hidden');

  clearPotInputValues();

}

function hideDeletePotModal() {

  var modalBackdrop = document.getElementById('modal-backdrop');
  var createPotModal = document.getElementById('delete-pot-modal');

  // Hide the modal and its backdrop.
  modalBackdrop.classList.add('hidden');
  createPotModal.classList.add('hidden');

  clearPotInputValues();

}

/*
 * A function that determines whether a given twit matches a search query.
 * Returns true if the twit matches the query and false otherwise.
 */
function potMatchesSearchQuery(pot, searchQuery) {
  /*
   * An empty query matches all twits.
   */
  if (!searchQuery) {
    return true;
  }

  /*
   * The search query matches the twit if either the twit's text or the twit's
   * author contains the search query.
   */
  searchQuery = searchQuery.trim().toLowerCase();
  return (pot.hostname + " " + pot.port + " " + pot.img).toLowerCase().indexOf(searchQuery) >= 0;
}


/*
 * Perform a search over over all the twits based on the search query the user
 * entered in the navbar.  Only display twits that match the search query.
 * Display all twits if the search query is empty.
 */
function doSearchUpdate() {

  /*
   * Grab the search query from the navbar search box.
   */
  //var searchQuery = document.getElementById('navbar-search-input').value;

  /*
   * Remove all twits from the DOM temporarily.
   */
  var potContainer = document.querySelector('.pot-container');
  if (potContainer) {
    while (potContainer.lastChild) {
      potContainer.removeChild(potContainer.lastChild);
    }
  }
  /*
   * Loop through the collection of all twits and add twits back into the DOM
   * if they match the current search query.
   */
  allPots.forEach(function (pot) {
    insertNewPot(pot.hostname, pot.port, pot.img);
  });

}




/*
 * This function parses an existing DOM element representing a single pot
 * into an object representing that pot and returns that object.  The object
 * is structured like this:
 *
 * {
 *   text: "...",
 *   author: "..."
 * }
 */
function parsePotElem(potElem) {

  var pot = {};

  var potHostnameElem = potElem.querySelector('.pot-host');
  pot.hostname = potHostnameElem.textContent.trim();

  var potPortLinkElem = potElem.querySelector('.pot-port');
  pot.port = potPortLinkElem.textContent.trim();

  var potImgLinkElem = potElem.querySelector('.pot-img');
  pot.img = potImgLinkElem.textContent.trim();

  return pot;

}


/*
 * Wait until the DOM content is loaded, and then hook up UI interactions, etc.
 */
window.addEventListener('DOMContentLoaded', function () {

  // Remember all of the existing pots in an array that we can use for search.
  var potElemsCollection = document.getElementsByClassName('pot');
  for (var i = 0; i < potElemsCollection.length; i++) {
    allPots.push(parsePotElem(potElemsCollection[i]));
  }

  var createPotButton = document.getElementById('create-pot-button');
  if (createPotButton) {
    createPotButton.addEventListener('click', showCreatePotModal);
  }

  var deletePotButton = document.getElementById('delete-pot-button');
  if (deletePotButton) {
    deletePotButton.addEventListener('click', showDeletePotModal);
  }

  var modalCloseButton = document.querySelector('#create-pot-modal .modal-close-button');
  if (modalCloseButton) {
    modalCloseButton.addEventListener('click', hideCreatePotModal);
  }
  var delmodalCloseButton = document.querySelector('#delete-pot-modal .modal-close-button');
  if (delmodalCloseButton) {
    delmodalCloseButton.addEventListener('click', hideDeletePotModal);
  }

  var modalCancelButton = document.querySelector('#create-pot-modal .modal-cancel-button');
  if (modalCancelButton) {
    modalCancelButton.addEventListener('click', hideCreatePotModal);
  }

  var delmodalCancelButton = document.querySelector('#delete-pot-modal .modal-cancel-button');
  if (delmodalCancelButton) {
    delmodalCancelButton.addEventListener('click', hideDeletePotModal);
  }

  var modalAcceptButton = document.querySelector('#create-pot-modal .modal-accept-button');
  if (modalAcceptButton) {
    modalAcceptButton.addEventListener('click', handleModalAcceptClick);
  }

  var searchButton = document.getElementById('navbar-search-button');
  if (searchButton) {
    searchButton.addEventListener('click', doSearchUpdate);
  }

  var searchInput = document.getElementById('navbar-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', doSearchUpdate);
  }

});
