$(document).ready(function() {
    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    var url = "https://docs.google.com/spreadsheets/d/1PJ3WNzB0MT-KN-_hDV0"
        + "0InJ4BaYeuFrXDIgIsIw5tms/pubhtml";
    var gss = new GoogleSpreadsheetsParser(
        url, {sheetTitle: 'Form Responses 1', hasTitle: true}
    );
    var events = {};            // {[date => event1, event2...],
                                //  [date2 => event...]}
    var dateIndex = 3;          // index of event date in the spreadsheet
    var titleIndex = 2;         // index of event title in the spreadsheet
    var titleLength = 8;        // length of title to display at calendar

    // default calendar to current date
    var d = new Date();
    processData()
    setTitleData(d.getMonth(), d.getFullYear())
    constructCalendar(d);

    $('#nextBtn').click(function() {
        // remove table rows except for the column names in order
        // to add new table rows
        $('table#calendar tr').not(':first').remove();

        // month wraps around when reaches 12 and adds a year; create 
        // first day of the new month as the date to create calendar from
        var month = $('#monthTitle').data('month');
        var year = $('#monthTitle').data('year')
        var newMonth = (month + 1) % 12;
        var newYear = month == 11 ? year + 1 : year;
        var newDate = new Date(monthNames[newMonth] + " 1, " + newYear);
        setTitleData(newMonth, newYear);
        constructCalendar(newDate);
    });

    $('#prevBtn').click(function() {
        // remove table rows except for the column names in order
        // to add new table rows
        $('table#calendar tr').not(':first').remove();

        // month wraps around when reaches 1 and sets back a year; create 
        // first day of the new month as the date to create calendar from
        var month = $('#monthTitle').data('month');
        var year = $('#monthTitle').data('year')
        var newMonth = month == 0 ? 11 : month - 1;
        var newYear = month == 0 ? year - 1 : year;
        var newDate = new Date(monthNames[newMonth] + " 1, " + newYear);
        setTitleData(newMonth, newYear);
        constructCalendar(newDate);
    });

    // construct a {date => [events]} object where each date correspond to
    // all events in the spreadsheet with that date
    function processData() {
        gss.contents.every(function(item, index) {
            // break out of the loop when reaching end of spreadsheet
            var date = item[dateIndex];
            if (date == null) {
                return false;
            }

            // create property if it has not been created, otherwise push
            // current event to the array which the property correspond to
            if (!events.hasOwnProperty(date)) {
                events[date] = [item];
            } else {
                events[date].push(item);
            }

            return true;
        });
    }

    function displayEvents() {
        // create a border and change color when a row is selected
        $('#calendar td').click(function() {
            $('#calendar td').removeClass('active');
            $('#calendar tr').css('outline', '');
            $(this).closest('tr').css('outline', 'thin solid');
            $(this).closest('tr').children('td').addClass('active');
        });

        // iterate through all table cells and display event titles
        $("#calendar td").each(function() {
            var currentCell = $(this);
            // skip all blank table cells
            var date = $('span', currentCell).text();
            if (date == "") {
                return;
            }

            // construct date formatted as MM/DD/YEAR
            date = ($('#monthTitle').data('month') + 1) + '/' + date + '/' +
                $('#monthTitle').data('year');

            // display event titles on days with events
            if (events.hasOwnProperty(date)) {
                events[date].forEach(function(item) {
                    $('ul', currentCell).append('<li>' +
                        item[titleIndex].substr(0, titleLength) + '...</li>');
                });
            }
        });
    }

    // set title to current month and data attributes to current month and year
    function setTitleData(month, year) {
        $('#monthTitle').text(monthNames[month]);
        $('#monthTitle').data('month', month);
        $('#monthTitle').data('year', year);
        $('#year').text(year);
    }

    // get number of days in a month, month is 1 based
    function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    function constructCalendar(date) {
        date.setDate(1);
        var totalDays = daysInMonth(date.getMonth() + 1, date.getFullYear());
        var firstDay = date.getDay();   // firstDay is the first day of the  
                                        // month from 0-6, for example, 
                                        //  Sun (0), Mon (1) ...
        var daysInWeek = 7;             // number of days in a week
        var count = 1;                  // counter for days in a month

        // construct HTML table for the month
        while (count <= totalDays) {
            var tr = document.createElement('tr');

            // create one row at a time
            for (var i = 0; i < daysInWeek; i++) {
                // create a cell for each day
                var td = document.createElement('td');
                var span = document.createElement('span');
                var ul = document.createElement('ul');

                // leave cell empty for the first row until first day
                // in the month
                if (i < firstDay && count <= 1) {
                    span.innerHTML = "";
                } else {
                    if (count <= totalDays) {
                        span.innerHTML = count;
                        count++;
                    }
                }
                // append table data to table row
                td.appendChild(span);
                td.appendChild(ul);
                tr.appendChild(td);
            }
            // append table row to calendar
            $('#calendar').append(tr);
        }
        // set class of all span element in calendar
        $('#calendar').find('span').addClass('date');
        displayEvents();
    }
});