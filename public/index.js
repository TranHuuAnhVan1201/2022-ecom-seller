// const primaryColor = "#4834d4";
// const warningColor = "#f0932b";
// const successColor = "#6ab04c";
// const dangerColor = "#eb4d4b";

// const themeCookieName = "theme";
// const themeDark = "dark";
// const themeLight = "light";

// const body = document.getElementsByTagName("body")[0];
// const mlToggle = document.getElementById("a-seller-wrapper");

// function setCookie(cname, cvalue, exdays) {
//   var d = new Date();
//   d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
//   var expires = "expires=" + d.toUTCString();
//   document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// }

// function getCookie(cname) {
//   var name = cname + "=";
//   var ca = document.cookie.split(";");
//   for (var i = 0; i < ca.length; i++) {
//     var c = ca[i];
//     while (c.charAt(0) == " ") {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) == 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return "";
// }

// loadTheme();

// function loadTheme() {
//   var theme = getCookie(themeCookieName);
//   body.classList.add(theme === "" ? themeLight : theme);
// }

// function switchTheme() {
//   if (body.classList.contains(themeLight)) {
//     body.classList.remove(themeLight);
//     body.classList.add(themeDark);
//     setCookie(themeCookieName, themeDark);
//   } else {
//     body.classList.remove(themeDark);
//     body.classList.add(themeLight);
//     setCookie(themeCookieName, themeLight);
//   }
// }

// function collapseSidebar() {
//   body.classList.toggle("sidebar-expand");
// }

// window.onclick = function (event) {
//   openCloseDropdown(event);
// };

// function closeAllDropdown() {
//   var dropdowns = document.getElementsByClassName("dropdown-expand");
//   for (var i = 0; i < dropdowns.length; i++) {
//     dropdowns[i].classList.remove("dropdown-expand");
//   }
// }

// function openCloseDropdown(event) {
//   if (!event.target.matches(".dropdown-toggle")) {
//     //
//     // Close dropdown when click out of dropdown menu
//     //
//     closeAllDropdown();
//   } else {
//     var toggle = event.target.dataset.toggle;
//     var content = document.getElementById(toggle);
//     if (content.classList.contains("dropdown-expand")) {
//       closeAllDropdown();
//     } else {
//       closeAllDropdown();
//       content.classList.add("dropdown-expand");
//     }
//   }
// }

// var ctx = document.getElementById("myChart");
// ctx.height = 500;
// ctx.width = 500;



// var dataDay = {
//   labels: [
//     "1",
//     "2",
//     "3",
//     "4",
//     "5",
//     "6",
//     "7",
//     "8",
//     "9",
//     "10",
//     "12",
//     "13",
//     "14",
//     "15",
//     "16",
//     "17",
//     "18",
//     "19",
//     "20",
//     "21",
//     "22",
//     "23",
//     "24",
//     "25",
//     "26",
//     "27",
//     "28",
//     "29",
//     "30",
//     "31",
//   ],
//   datasets: [
//     {
//       fill: false,
//       label: "Completed",
//       borderColor: successColor,
//       data: [
//         120,
//         115,
//         0,
//         100,
//         88,
//         99,
//         66,
//         0,
//         52,
//         59,
//         10,
//         20,
//         30,
//         40,
//         60,
//         70,
//         80,
//         0,
//         100,
//         101,
//         105,
//         110,
//         115,
//         0,
//         130,
//         150,
//         160,
//         170,
//         180,
//          240,
//       ],
//       borderWidth: 2,
//       lineTension: 0,
//     },
//     {
//       fill: false,
//       label: "Issues",
//       borderColor: dangerColor,
//       data: [
//         10,
//         20,
//         30,
//         40,
//         60,
//         70,
//         80,
//         0,
//         100,
//         101,
//         105,
//         110,
//         115,
//         0,
//         130,
//         150,
//         160,
//         170,
//         180,
//         200,
//         66,
//         44,
//         12,
//         48,
//         99,
//         56,
//         78,
//         23,
//         100,
//         240,
//       ],
//       borderWidth: 2,
//       lineTension: 0,
//     },
//   ],
// };
// var dataMonth = {
//   labels: [
//     "January",
//     "February",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ],
//   datasets: [
//     {
//       fill: false,
//       label: "Completed",
//       borderColor: successColor,
//       data: [120, 115, 130, 100, 123, 88, 99, 66, 120, 52, 59],
//       borderWidth: 2,
//       lineTension: 0,
//     },
//     {
//       fill: false,
//       label: "Issues",
//       borderColor: dangerColor,
//       data: [66, 44, 12, 48, 99, 56, 78, 23, 100, 22, 47],
//       borderWidth: 2,
//       lineTension: 0,
//     },
//   ],
// };


// // var lineChart = new Chart(ctx, {
// //   type: "line",
// //   // type: "bar",
// //   data: dataMonth,
// //   options: {
// //     maintainAspectRatio: false,
// //     bezierCurve: false,
// //   },
// // });

// // const config = {
// //   type: "bar",
// //   data: data,
// //   options: {
// //     scales: {
// //       y: {
// //         beginAtZero: true,
// //       },
// //     },
// //   },
// // };

