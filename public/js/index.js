$(document).ready(function() {
    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    // default calendar to current date
    var d = new Date();
    constructCalendar(d);
    setTitleData(d.getMonth(), d.getFullYear())

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
        constructCalendar(newDate);
        setTitleData(newMonth, newYear);
    });

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
                tr.appendChild(td);
            }
            // append table row to calendar
            $('#calendar').append(tr);
        }
        // set class of all span element in calendar
        $('#calendar').find('span').addClass('date');
    }
});