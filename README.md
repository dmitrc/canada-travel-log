# What is this?

As a part of citizenship process in Canada, you are [required](https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/become-canadian-citizen/eligibility.html#time) to be a resident for 3 years (1095 days) before applying.

You can log your history and track the eligible days directly on the official [physical presence calculator](https://eservices.cic.gc.ca/rescalc/) or on paper forms, but I've found that it's easier for me to maintain an Excel spreadsheet with this data.

Some downsides of this approach are needing to do your own math and a [requirement](https://www.canada.ca/content/dam/ircc/migration/ircc/english/pdf/kits/citizen/cit0007e-2.pdf) to submit either a paper form or a printout from the official calculator at the time of the application. This project aims to solve both of those concerns by providing a starter Excel spreadsheet with all of the formulas honed down, as well as a converter script to inject this data directly into the calculator tool.

# How does this work?

* Fill out the travel history in the provided Excel spreadsheet
  * You can use pivot tables on the other sheets to see your stats and the date when you are eligible to apply.  
  Don't forget to refresh them (`Right click -> Refresh`) every now and then.

* Save the `Data` sheet (_first one_) in CSV format

* Convert that CSV to JSON
  * One simple way to do this is to use an online tool like [this](https://csvjson.com/csv2json)

* Save the result into some folder as `travel.json`

* Run an HTTP server within that folder (at port `8080`)
   * One way to do this is to install `http-server` globally from `npm`
   * Then execute `http-server --cors -c-1`
   * (_Alternatively_) Upload the JSON file somewhere online and modify the path in the script below

* Install [Tampermonkey](https://www.tampermonkey.net/) browser extension

* Add a new script with contents from provided `inject.js`
   * Always inspect the source code before running someone else's scripts!

* Open the official [physical presence calculator](https://eservices.cic.gc.ca/rescalc/)

* Fill out all the relevant details until you reach the page where you need to list your absences

* At this point if you imported the script correctly and activated it, a dialog should pop-up asking if you want to run the script
  * If you see this dialog prior to this step, press "Cancel" as it will not work on any page other than this one

* Click "OK", after which all the absences will be filled out automatically
  * If you see some errors, double-check that you've followed the steps above correctly and the format is consistent
  * If you see missing countries in the final list, modify the script to include the name override to match the entry in the list (_and submit a PR_)
  
  # Disclaimer
  
  This spreadsheet and script are provided as-is and I will hold no liability for any miscalculations, inaccuracies in your application or broken hopes and dreams. Be sure to always double-check everything you're submitting **manually** to ensure the utmost accuracy.
  
  # License
  
  You're welcome to use, distribute and do whatever you want with this, as long as you're not pursuing commercial gain from it.
