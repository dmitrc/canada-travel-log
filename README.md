* Fill out travel history in the provided Excel spreadsheet

* Save the first sheet as CSV

* Convert that CSV to JSON

* Save the result into some folder as `travel.json`

* Run HTTP server within that folder (at port 8080)
   * One way to do this is to install `http-server` globally fr
   om `npm`
   * Then execute `http-server --cors -c-1`

* Install Tampermonkey browser extension

* Add a new script with contents from provided `inject.js`
   * Always inspect the source code before running some stranger's scripts!

* Open the official [physical presence calculator](https://eservices.cic.gc.ca/rescalc/)

* Fill out all the relevant details until you reach the page where you need to list your absences

* At this point if you imported the script correctly and activated it, a dialog should popup asking if you want to run the script

* Click "OK", after which all the absences will be filled out automatically (if you followed the previous steps correctly)