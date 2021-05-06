var statusDict = {};
var leaveTypes = {};

statusDict[1] = "Pending";
statusDict[2] = "Approved";
statusDict[3] = "Rejected";
statusDict[4] = "Cancelled";

function setCookie(name,value,days) {

    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

setCookie("skip_mobile_warning", true, 10);
console.log(document.cookie)

fetch ("https://aafreshteam2779.freshhr.com/timeoff/settings/leave_policies/8990", {

    method: "GET",
    credentials: 'include',
    headers: {

        //"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1",
        "Content-Type": "application/json",
        "Accept": "application/json",
        // "Accept": "text/html",
        "Authorization": "<auth_token_here>",
        "Cookie": document.cookie
        // "X-Frame-Options": "ALLOW",
        // "X-Content-Type-Options": "nosniff"
    },
    // body: {
    //         "user": {
    //                 "email":"aafreshteam2779@gmail.com",
    //                 "password":"test1234"
    //             }
    // }
}).then( function (resp) {

    //resp.setHeader("Set-Cookie", ['skip_mobile_warning=true'])
    console.log(resp)
    return resp.json()
}).then( function (resp) {
    console.log(resp)

    var nameLabel = document.getElementById("upcoming-holiday-label")
    nameLabel.innerHTML = getUpcomingHolidayName(resp["holiday_lists"])

    var dateLabel = document.getElementById("upcoming-holiday-date")
    dateLabel.innerHTML = getFormattedDate(getUpcomingHolidayDate(resp["holiday_lists"]))

    createLeaveTypeDictionary(resp.leave_types)

    fetch ("https://aafreshteam2779.freshhr.com/timeoff/leave_requests?query_hash[0][condition]=user_id&query_hash[0][operator]=is_in&query_hash[0][value]=1000082043&query_hash[1][condition]=start_date&query_hash[1][operator]=is_after&query_hash[1][value]=2020-11-01&sort=start_date&sort_type=desc&per_page=200", {

        method: "GET",
        headers: {
            "User-Agent": "freshteam_mobile_ios/2.0",
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "<auth_token_here>"
        },
    }).then (function (resp) {

        console.log(resp);
        return resp.json()
    }).then (function (resp) {

        //console.log(resp.clone["leave_requests"])
        showLeaveRequests(resp["leave_requests"])
    })
}).catch(function (err) {
    console.log("SOME ERRORS OCCURED")
    alert(err.message)
})

function createLeaveTypeDictionary(leaveTypesArray) {

    for(var i=0; i<leaveTypesArray.length; i++) {

        leaveTypes[leaveTypesArray[i].id] = leaveTypesArray[i].name;
    }
}

function showLeaveRequests( leaveRequests ) {

    var node = document.getElementById("timeoff-history")
    for (var i=0; i<leaveRequests.length; i++) {

        console.log(leaveRequests[i])
        console.log(leaveTypes[leaveRequests[i].leave_type_id])
        console.log(leaveRequests[i]["status"])
        node.innerHTML += getLeaveRequestBoxHtmlSkeleton( leaveTypes[leaveRequests[i].leave_type_id], leaveRequests[i]["created_at"], statusDict[leaveRequests[i]["status"]])
    }
}

function getLeaveRequestBoxHtmlSkeleton( leaveType, leaveDate, leaveStatus ) {

    var date = Date(leaveDate)  

    var htmlSkeleton = '<div class="leave-request-box"><label style="float: left; color:#969696; font-size: 14px;">' + leaveType + '</label><label style="float: left; clear: both; padding-top: 5px; font-size: 14px;">' + getFormattedDate(leaveDate) + '</label><div class="leave-request-status"><div class="leave-request-circle" style="background-color:' + getStatusColor(leaveStatus) + ';"></div><label style="padding-left: 5px; color:#969696; font-size: 14px;">' + leaveStatus  + '</label></div></div>';
    return htmlSkeleton;
} 

function getMinHoliday(holidayLists) {

    var holiday = null;
    var currDiff = null;

    for (var i=0; i < holidayLists.length; i++) {

        var d = new Date(holidayLists[i].start_date);

        if (holiday == null) {
            holiday = holidayLists[i];
            currDiff = Math.abs(d - (new Date()));
            continue;
        }

        if (Math.abs(d - (new Date())) < currDiff) {
            holiday = holidayLists[i];
            currDiff = Math.abs(d - (new Date()));
        }
    }

    return holiday;
}

function getUpcomingHolidayName(holidayLists) {

    var holiday = getMinHoliday(holidayLists);
    return holiday.name;
}

function getUpcomingHolidayDate(holidayLists) {

    var holiday = getMinHoliday(holidayLists);
    return holiday.start_date;
}

function getStatusColor (status) {

    if (status == "Approved") {

        return "#239F84";
    }

    if (status == "Pending") {

        return "#F68034";
    }

    if (status == "Rejected") {

        return "#D9616E";
    }

    if (status == "Cancelled") {

        return "#D9616E";
    }
} 

function getFormattedDate(date) {

    var y = date.slice(0, 4);
    var m = date.slice(5, 7);
    var d = date.slice(8, 10);

    var formattedDate = d + " " + getMonth(m) + ", " + y;
    return formattedDate;
}

function getMonth(month) {

    if (month == 01) {

        return "Jan";
    }

    if (month == 02) {

        return "Feb";
    }

    if (month == 03) {

        return "Mar";
    }

    if (month == 04) {

        return "Apr";
    }

    if (month == 05) {

        return "May";
    }

    if (month == 06) {

        return "Jun";
    }

    if (month == 07) {

        return "Jul";
    }

    if (month == 08) {

        return "Aug";
    }

    if (month == 09) {

        return "Sep";
    }

    if (month == 10) {

        return "Oct";
    }

    if (month == 11) {

        return "Nov";
    }

    if (month == 12) {

        return "Dec";
    }



}

