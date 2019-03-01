document.querySelector('.get-jokes').addEventListener('click', getJokes);

function getJokes(e) {

  //Get the number of jokes needed
  const number = document.querySelector('input[type = "number"]').value;

  //Creating a XML HTTP Request object
  const xhr = new XMLHttpRequest();

  //Fetching jokes from api
  xhr.open('GET', `http://api.icndb.com/jokes/random/${number}`, true);

  //Process the data that is fecthed from the api
  xhr.onload = function () {
    if (this.status === 200) {
      //Assigning a variable for the response text.
      const response = JSON.parse(this.responseText);

      //Initialising an empty string
      let output = '';

      //Checking if the response was success or not.
      if (response.type === 'success') {
        //Since the response has an array of value objects, we use the
        //foreach function to loop through those values. 
        response.value.forEach(function (joke) {
          output += `<li>${joke.joke}</li>`;
        });
      } else {
        //Sending out if the response was failure.
        output += `<li>Something went wrong</li>`
      }

      document.querySelector('.jokes').innerHTML = output;
    }
  }

  //Sending XHR
  xhr.send();

  e.preventDefault();
}