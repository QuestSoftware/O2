var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: function () {
            /*return "../../Charts/endpoints/sla-variance-drill-down-grey.json";*/
             return "../../Charts/endpoints/sla-variance-drill-down-red.json";
           /* return "../../Charts/endpoints/sla-variance-drill-down-orange.json";*/
          },
          dataType: "json"
        }
      },
      group: {
        field: "type"
      }
    }),
    valueArrayX = new Array(),
    valueArrayY = new Array();
$.ajax({
  /*url: "../../Charts/endpoints/sla-variance-drill-down-grey.json"*/
  url: "../../Charts/endpoints/sla-variance-drill-down-red.json"
 /* url: "../../Charts/endpoints/sla-variance-drill-down-orange.json"*/
}).done(function (response) {
  var i = 1, j = 1;
  $.each(response, function (key, val) {
    if (!isInArray(val.category, valueArrayX)) {
      valueArrayX[i] = val.category;
      console.log(val.category);
      i++;
    }

  });

  /*$.each(valueArrayX, function (index, value) {
   console.log(index + ": " + value);
   });*/

  $.each(response, function (key, val) {
    if (!isInArray(val.sla, valueArrayY)) {
      valueArrayY[j] = val.sla;
      j++;
    }
  });

  /*$.each(valueArrayY, function (index, value) {
   console.log(index + ": " + value);
   });*/
});

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

function changeXLabels(value) {
  return valueArrayX[value] == undefined ? "" : valueArrayX[value];
}

function changeYLabels(value) {
  return valueArrayY[value] == undefined ? "" : valueArrayY[value];
}

function createChart() {
  /*requests*/
  $(".chart-overall-opened-closed").kendoChart({
    title: {
      text: "Number of Requests "
    },
    legend: {
      visible: true,
      position: "bottom"
    },
    seriesDefaults: {
      type: "column",
      labels: {
        visible: true,
        background: "transparent",
        position: "center",
        color: "white"
      }
    },
    series: [{
      overlay: {
        gradient: "none"
      },
      name: "Opened Requests",
      stack: "Open",
      data: [120, 160, 80, 90, 140, 110, 65, 140, 100, 80, 130, 85]
    }, {
      overlay: {
        gradient: "none"
      },
      name: "Closed Requests",
      stack: "Complete",
      data: [100, 140, 80, 90, 120, 100, 60, 140, 100, 60, 110, 85]
    }],
    seriesColors: ["#579AD6", "#78C466"],
    valueAxis: {
      Max: 160,
      majorUnit: 5,
      line: {
        visible: false
      },
      labels: {
        step: 2
      }
    },
    categoryAxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      majorGridLines: {
        visible: false
      }
    },
    tooltip: {
      visible: true,
      template: "#= series.name #"
    }
  });
  $("#chart-opened-closed-data-protection").kendoChart({
    title: {
      text: "Number of Requests "
    },
    legend: {
      visible: false
    },
    chartArea: {
      width: 355,
      height: 260
    },
    seriesDefaults: {
      type: "column",
      gap: 1,
      spacing: 1,
      labels: {
        visible: true,
        background: "transparent",
        position: "top",
        padding: {
          top: -20
        }
      }
    },
    series: [{
      overlay: {
        gradient: "none"
      },
      name: "Opened Requests",
      stack: "Open",
      data: [30, 40, 10, 20, 10, 15, 5, 20, 10, 10, 30, 5]
    }, {
      overlay: {
        gradient: "none"
      },
      name: "Closed Requests",
      stack: "Complete",
      data: [30, 30, 10, 20, 10, 15, 5, 20, 10, 10, 30, 5]
    }],
    seriesColors: ["#579AD6", "#78C466"],
    valueAxis: {
      Max: 250,
      majorUnit: 5,
      line: {
        visible: false
      },
      label: {
        margin: -30
      }
    },
    categoryAxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      majorGridLines: {
        visible: false
      }
    },
    tooltip: {
      visible: true,
      template: "#= series.name #"
    }
  });
  $("#sla-variance").kendoChart({
    /*title: {
     position: "top",
     text: "Tasks"
     },*/
    legend: {
      visible: false
    },
    chartArea: {
      background: ""
    },
    seriesDefaults: {
      type: "donut",
      startAngle: 150
    },
    series: [{
      name: "early",
      padding: 20,
      overlay: {
        gradient: "none"
      },
      data: [{
        category: "-1",
        value: 200,
        color: "#D2F3CA"
      }, {
        category: "-2 to -3",
        value: 125,
        color: "#B7E0AE"
      }, {
        category: "-4 to -5",
        value: 150,
        color:"#9DCD92"
      }, {
        category: "-6 to -7 to -8",
        value: 120,
        color: "#83BA76"
      }, {
        category: "-8+",
        value: 100,
        color: "#69A85A"
      }],
      labels: {
        visible: true,
        font: "bold 14px Arial,Helvetica,sans-serif",
        background: "transparent",
        position: "center",
        template: "#= value #",
        color: "black"
      }
    }, {
      name: "late",
      overlay: {
        gradient: "none"
      },
      data: [{
        category: "+1",
        value: 200,
        color: "#F5DFD7"
      }, {
        category: "+2 to +3",
        value: 175,
        color: "#F1C1B0"
      }, {
        category: "+4 to +5",
        value: 50,
        color: "#EDA48A"
      }, {
        category: "+6 to +7 to +8",
        value: 140,
        color: "#E98664"
      }, {
        category: "8+",
        value: 40,
        color: "#E6693E"
      }],
      labels: {
        visible: true,
        font: "bold 14px Arial,Helvetica,sans-serif",
        background: "transparent",
        position: "center",
        template: "#= value #"
      }
    }],
    tooltip: {
      visible: true,
      template: "SLA Variance #= category # : #= value # tasks"
    }
  });
  $("#slav-met-missed-sla").kendoChart({
    legend: {
      visible: false
    },
    chartArea: {
      background: ""
    },
    seriesDefaults: {
      labels: {
        visible: true,
        background: "transparent",
        font: "14px Arial,Helvetica,sans-serif",
        position: "center",
        color: "white",
        template: "#= value #%"
      }
    },
    series: [{
      type: "pie",
      padding: 0,
      startAngle: 90,
      overlay: {
        gradient: "none"
      },
      data: [{
        category: "Met SLA",
        value: 15,
        tasks: 100,
        color: "#479035"
      }, {
        category: "Missed SLA",
        value: 85,
        tasks: 595,
        color: "#FF9900"
      }]
    }],
    tooltip: {
      visible: true,
      template: "#= category# : #= dataItem.tasks# tasks "
    }
  });
  $("#baseline-vs-actual").kendoChart({
    /*title: {
     position: "top",
     text: "Tasks"
     },*/
    legend: {
      visible: false
    },
    chartArea: {
      background: ""
    },
    seriesDefaults: {
      type: "donut",
      startAngle: 150
    },
    series: [{
      name: "Ended late",
      padding: 20,
      overlay: {
        gradient: "none"
      },
      data: [{
        category: "-1",
        value: 50,
        color: "#D2F3CA"
      }, {
        category: "-2 to -3",
        value: 25,
        color: "#B7E0AE"
      }, {
        category: "-4 to -5",
        value: 10,
        color: "#9DCD92"
      }, {
        category: "-6 to -7 to -8",
        value: 10,
        color: "#83BA76"
      }, {
        category: "-8+",
        value: 10,
        color: "#69A85A"
      }]
      ,
      labels: {
        visible: true,
        font: "bold 14px Arial,Helvetica,sans-serif",
        background: "transparent",
        position: "center",
        template: "#= value #",
        color: "black"
      }
    }, {
      name: "Started late",
      overlay: {
        gradient: "none"
      },
      data: [{
        category: "+1",
        value: 75,
        color: "#F5DFD7"
      }, {
        category: "+2 to +3",
        value: 50,
        color: "#F1C1B0"
      }, {
        category: "+4 to +5",
        value: 20,
        color: "#EDA48A"
      }, {
        category: "+6 to +7 to +8",
        value: 40,
        color: "#E98664"
      }, {
        category: "8+",
        value: 20,
        color: "#E6693E"
      }],
      labels: {
        visible: true,
        font: "bold 14px Arial,Helvetica,sans-serif",
        background: "transparent",
        position: "center",
        template: "#= value #",
        color: "black"
      }
    }],
    tooltip: {
      visible: true,
      template: "#= series.name # #= category # : #= value # tasks"
    }
  });
  $("#started-late-ended-early").kendoChart({
    legend: {
      visible: false
    },
    chartArea: {
      background: ""
    },
    seriesDefaults: {
      labels: {
        visible: true,
        background: "transparent",
        font: "14px Arial,Helvetica,sans-serif",
        position: "center",
        color: "white",
        template: "#= value #%"
      }
    },
    series: [{
      type: "pie",
      padding: 0,
      startAngle: 90,
      overlay: {
        gradient: "none"
      },
      data: [{
        category: "Started late",
        value: 76,
        tasks: 205,
        color: "#69a2d6"
      }, {
        category: "Ended early",
        value: 24,
        tasks: 65,
        color: "#E6693E"
      }]
    }],
    tooltip: {
      visible: true,
      template: "#= category# : #= dataItem.tasks# tasks"
    }
  });
  $("#started-early-ended-late-1").kendoChart({
    legend: {
      visible: false
    },
    chartArea: {
      background: ""
    },
    seriesDefaults: {
      labels: {
        visible: true,
        background: "transparent",
        font: "14px Arial,Helvetica,sans-serif",
        position: "center",
        color: "white",
        template: "#= value#%"
      }
    },
    series: [{
      type: "pie",
      padding: 0,
      startAngle: 90,
      overlay: {
        gradient: "none"
      },
      data: [{
        category: "Started early",
        value: 58,
        tasks: 145,
        color: "#69a2d6"
      }, {
        category: "Ended late",
        value: 42,
        tasks: 105,
        color: "#E6693E"
      }]
    }],
    tooltip: {
      visible: true,
      template: "#= category# : #= dataItem.tasks# tasks"
    }
  });
  $("#planned-vs-actual").kendoChart({
    /*title: {
     position: "top",
     text: "Tasks"
     },*/
    legend: {
      visible: false
    },
    chartArea: {
      background: ""
    },
    seriesDefaults: {
      type: "donut",
      startAngle: 150
    },
    series: [{
      name: "Ended late",
      padding: 20,
      overlay: {
        gradient: "none"
      },
      data: [{
        category: "-1",
        value: 50,
        color: "#D2F3CA"
      }, {
        category: "-2 to -3",
        value: 25,
        color: "#B7E0AE"
      }, {
        category: "-4 to -5",
        value: 10,
        color: "#9DCD92"
      }, {
        category: "-6 to -7 to -8",
        value: 10,
        color: "#83BA76"
      }, {
        category: "-8+",
        value: 10,
        color: "#69A85A"
      }]
      ,
      labels: {
        visible: true,
        font: "bold 14px Arial,Helvetica,sans-serif",
        background: "transparent",
        position: "center",
        template: "#= value #",
        color: "black"
      }
    }, {
      name: "Started late",
      overlay: {
        gradient: "none"
      },
      data: [{
        category: "+1",
        value: 65,
        color: "#F5DFD7"
      }, {
        category: "+2 to +3",
        value: 70,
        color: "#F1C1B0"
      }, {
        category: "+4 to +5",
        value: 30,
        color: "#EDA48A"
      }, {
        category: "+6 to +7 to +8",
        value: 20,
        color: "#E98664"
      }, {
        category: "8+",
        value: 30,
        color: "#E6693E"
      }],
      labels: {
        visible: true,
        font: "bold 14px Arial,Helvetica,sans-serif",
        background: "transparent",
        position: "center",
        template: "#= value #",
        color: "black"
      }
    }],
    tooltip: {
      visible: true,
      template: "#= series.name # #= category # : #= value # tasks"
    }
  });
  $("#started-late-ended-late").kendoChart({
    legend: {
      visible: false
    },
    chartArea: {
      background: ""
    },
    seriesDefaults: {
      labels: {
        visible: true,
        background: "transparent",
        font: "14px Arial,Helvetica,sans-serif",
        position: "center",
        color: "white",
        template: "#= value#%"
      }
    },
    series: [{
      type: "pie",
      padding: 0,
      startAngle: 90,
      overlay: {
        gradient: "none"
      },
      data: [{
        category: "Started late",
        value: 59,
        tasks: 215,
        color: "#69a2d6"
      }, {
        category: "Ended late",
        value: 41,
        tasks: 150,
        color: "#9d9d9d"
      }]
    }],
    tooltip: {
      visible: true,
      template: "#= category#: #= dataItem.tasks# tasks "
    }
  });
  $("#started-early-ended-late-2").kendoChart({
    legend: {
      visible: false
    },
    chartArea: {
      background: ""
    },
    seriesDefaults: {
      labels: {
        visible: true,
        background: "transparent",
        font: "14px Arial,Helvetica,sans-serif",
        position: "center",
        color: "white",
        template: "#= value#%"
      }
    },
    series: [{
      type: "pie",
      padding: 0,
      startAngle: 90,
      overlay: {
        gradient: "none"
      },
      data: [{
        category: "Started early",
        value: 70,
        tasks: 250,
        color: "#69a2d6"
      }, {
        category: "Ended late",
        value: 30,
        tasks: 105,
        color: "#9d9d9d"
      }]
    }],
    tooltip: {
      visible: true,
      template: "#= category#: #= dataItem.tasks# tasks "
    }
  });
  $("#sla-variance-dd").kendoChart({
    dataSource: dataSource,
    /*title: {
     text: "SLA per Task Type"
     },*/
    legend: {
      visible: false
    },
    seriesDefaults: {
      type: "bubble",
      labels: {
        visible: true,
        font: "bold 13px Arial,Helvetica,sans-serif",
        background: "transparent",
        position: "center",
        format: "{2:N0}",
        color: "black"
      }
    },
    chartArea: {
      background: ""
    },
    series: [{
      type: "bubble",
      minSize: 10,
      maxSize: 40,
      xField: "standing",
      yField: "range",
      sizeField: "number",
      colorField: "color",
      opacity: 0.9
    }]
    ,
    xAxis: {
      labels: {
        template: "#= changeXLabels(value) #"
      },
      majorUnit: 1,
      max: 11,
      appearance: {
        LabelAppearance: {
          Position: {
            AlignedPosition: "center"
          }
        }
      }
    },
    yAxis: {
      labels: {
        margin: {top: 0},
        template: "#= changeYLabels(value) #"
      },
      axisCrossingValues: 6,
      majorUnit: 1,
      max: 12,
      plotBands: [{
        from: 10,
        to: 12,
        color: "#E5F3FA",
        opacity:"0.8"
      }]
    },
    tooltip: {
      visible: true,
      template: "SLA #=dataItem.sla # : #=dataItem.number # Requests"
    },
    seriesClick: function (e) {
      console.log("category:" + e.dataItem.category + "  & SLA: " + e.dataItem.sla);
    }
  });

  /*tasks*/
  $("#opened-closed-tasks-by-owner").kendoChart({
    title: {
      /* text: "Number of comments by task type"*/
    },
    legend: {
      visible: false
    },
    seriesDefaults: {
      type: "bar",
      overlay:{
        gradient:"none"
      },
      labels: {
        visible: true,
        background: "transparent",
        position: "center",
        color: "black"
      }
    },
    series: [/*{
      name: "Closed",
      stack: "Closed",
      data: [4, 8, 6, 7, 3],
      color: "#4caf50"
    },*/
      {
        name: "Backlog",
        stack: "Opened",
        data: [5, 10, 15, 20, 26],
        color: "#FFEBCC"
      }, {
        name: "In progress",
        stack: "Opened",
        data: [7, 10, 11, 17, 23],
        color: "#FFD9A0"
      }, {
        name: "Ready on stage",
        stack: "Opened",
        data: [10, 10, 15, 20, 25],
        color: "#FFBC57"
      },{
        name: "Ready to post live",
        stack: "Opened",
        data: [10, 10, 12, 15, 22],
        color: "#FFAA2B"
      },{
        name: "Ready on stage",
        stack: "Opened",
        data: [10, 14, 15 , 17, 19],
        color: "#FF9900"
      }],
    valueAxis: {
      Max: 200,
      line: {
        visible: true
      }
    },
    categoryAxis: {
      categories: ["Elnaz", "Edward", "Diana", "BJ", "Jorge"],
      majorGridLines: {
        visible: false
      }
    },
    tooltip: {
      visible: true,
      template: "#= series.name #"
    }
  });
  /*$("#15-open-closed-tickets-per-task-type").kendoChart({
   dataSource: {
   transport: {
   read: {
   url: "../../Charts/endpoints/opened-closed-tasks.json",
   dataType: "json"
   }
   }
   },
   title: {
   text: ""
   },
   legend: {
   visible: false
   },
   seriesDefaults: {
   type: "column"
   },
   series: [{
   field: "HPGCreative",
   name: "HPG Creative"
   }, {
   field: "HPGContent",
   name: "HPG Content"
   }, {
   field: "AddTags",
   name: "Add Tags"
   }, {
   field: "AnimatedVideo",
   name: "Animated Video"
   }, {
   field: "CreateLogo",
   name: "Create Logo"
   }, {
   field: "EmailSupport",
   name: "Email Support"
   }, {
   field: "EventContent",
   name: "Event Content"
   }, {
   field: "ListPull",
   name: "List Pull"
   }, {
   field: "MediaPlan",
   name: "Media Plan"
   }, {
   field: "ReportingSupport",
   name: "Reporting Support"
   }, {
   field: "InfographicCreative",
   name: "Infographic Creative"
   }, {
   field: "OnsiteSearch",
   name: "Onsite Search"
   }, {
   field: "OptimizePage",
   name: "Optimize Page"
   }, {
   field: "NewTraining",
   name: "New Training"
   }, {
   field: "MediaLayout",
   name: "Media Layout"
   }],
   categoryAxis: {
   field: "time",
   labels: {
   /!*rotation: -90*!/
   },
   crosshair: {
   visible: true
   }
   },
   valueAxis: {
   Max: 100,
   majorUnit: 20,
   labels: {},
   minorGridLines: {
   visible: true
   }
   },
   tooltip: {
   visible: true,
   shared: true,
   format: "N0"
   }
   });*/

  $("#10-open-tickets-per-task-type").kendoChart({
    title: {
      text: "Number of comments by task type"
    },
    legend: {
      visible: true,
      position:"bottom"
    },
    seriesDefaults: {
      overlay: {
        gradient: "none"
      },
      type: "column",
      labels: {
        visible: false,
        background: "transparent",
        position: "center",
        color: "white"
      }
    },
    series: [{
      name: "HPG Creative",
      stack: "open tickets",
      data: [4, 8, 6, 7, 3, 10, 20, 8, 10, 10, 6, 10],
      color: "#004C70"
    }, {
      name: "HPG Content",
      stack: "open tickets",
      data: [7, 9, 13, 8, 11, 35, 20, 29, 21, 16, 13, 20],
      color: "#467cac"
    }, {
      name: "Add Tags",
      stack: "open tickets",
      data: [10, 10, 20, 10, 20, 60, 20, 50, 32, 23, 20, 30],
      color: "#4d87bb"
    }, {
      name: "Animated Video",
      stack: "open tickets",
      data: [6, 5, 50, 10, 5, 16, 10, 5, 12, 23, 20, 15],
      color: "#5290c8"
    }, {
      name: "Create Logo",
      stack: "open tickets",
      data: [10, 0, 50, 10, 5, 6, 20, 5, 32, 23, 20, 30],
      color: "#589AD6"
    },{
      name: "Email Support",
      stack: "open tickets",
      data: [4, 8, 6, 7, 3, 10, 20, 8, 20, 40, 6, 10],
      color: "#5da2e0"
    }, {
      name: "Event Content",
      stack: "open tickets",
      data: [7, 9, 13, 8, 11, 35, 20, 29, 21, 16, 13, 20],
      color: "#60a7e7"
    }, {
      name: "List Pull",
      stack: "open tickets",
      data: [10, 10, 20, 10, 20, 60, 20, 50, 32, 23, 20, 30],
      color: "#63acee"
    }, {
      name: "Media Plan",
      stack: "open tickets",
      data: [6, 5, 50, 10, 5, 16, 10, 5, 12, 23, 20, 15],
      color: "#66b1f5"
    }, {
      name: "Reporting Support",
      stack: "open tickets",
      data: [10, 0, 50, 10, 5, 6, 20, 5, 32, 23, 20, 30],
      color: "#6bb9ff"
    }],
    valueAxis: {
      Max: 200,
      Min: 10,
      step: 10,
      line: {
        visible: false
      }
    },
    categoryAxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      majorGridLines: {
        visible: false
      }
    },
    tooltip: {
      visible: true,
      template: "#= series.name #: #= value #"
    }
  });
  $("#10-close-tickets-per-task-type").kendoChart({
    title: {
      text: "Number of comments by task type"
    },
    legend: {
      visible: true,
      position:"bottom"
    },
    seriesDefaults: {
      overlay: {
        gradient: "none"
      },
      type: "column",
      labels: {
        visible: false,
        background: "transparent",
        position: "center",
        color: "white"
      }
    },
    series: [{
      name: "HPG Creative",
      stack: "close tickets",
      data: [4, 8, 6, 7, 3, 10, 20, 8, 10, 10, 6, 10],
      color: "#175D05"
    }, {
      name: "HPG Content",
      stack: "close tickets",
      data: [7, 9, 13, 8, 11, 35, 20, 29, 21, 16, 13, 20],
      color: "#1a6906"
    }, {
      name: "Add Tags",
      stack: "close tickets",
      data: [10, 10, 20, 10, 20, 60, 20, 50, 32, 23, 20, 30],
      color: "#1f7a08"
    }, {
      name: "Animated Video",
      stack: "close tickets",
      data: [6, 5, 50, 10, 5, 16, 10, 5, 12, 23, 20, 15],
      color: "#228608"
    }, {
      name: "Create Logo",
      stack: "close tickets",
      data: [10, 0, 50, 10, 5, 6, 20, 5, 32, 23, 20, 30],
      color: "#26930a"
    },{
      name: "Email Support",
      stack: "close tickets",
      data: [4, 8, 6, 7, 3, 10, 20, 8, 20, 40, 6, 10],
      color: "#2aa20b"
    }, {
      name: "Event Content",
      stack: "close tickets",
      data: [7, 9, 13, 8, 11, 35, 20, 29, 21, 16, 13, 20],
      color: "#2fb50c"
    }, {
      name: "List Pull",
      stack: "close tickets",
      data: [10, 10, 20, 10, 20, 60, 20, 50, 32, 23, 20, 30],
      color: "#43bb24"
    }, {
      name: "Media Plan",
      stack: "close tickets",
      data: [6, 5, 50, 10, 5, 16, 10, 5, 12, 23, 20, 15],
      color: "#5dd93d"
    }, {
      name: "Reporting Support",
      stack: "close tickets",
      data: [10, 0, 50, 10, 5, 6, 20, 5, 32, 23, 20, 30],
      color: "#7df75d"
    }],
    valueAxis: {
      Max: 200,
      Min: 10,
      step: 10,
      line: {
        visible: false
      }
    },
    categoryAxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      majorGridLines: {
        visible: false
      }
    },
    tooltip: {
      visible: true,
      template: "#= series.name #: #= value #"
    }
  });

  /*Rupert*/
  $("#planned-data-protection").kendoChart({
    title: {
      /*text: "Number of Requests "*/
    },
    legend: {
      visible: true,
      position: "bottom"
    },
    seriesDefaults: {
      type: "column",
      labels: {
        visible: true,
        background: "transparent",
        position: "center",
        color: "white"
      }
    },
    series: [{
      overlay: {
        gradient: "none"
      },
      name: "Planned In Sprint",
      stack: "Complete",
      data: [100, 140, 80]
    }, {
      overlay: {
        gradient: "none"
      },
      name: "Planned Outside of Sprint",
      stack: "Open",
      data: [50, 20, 30]
    }],
    seriesColors: ["#78C466", "#FF9900"],
    valueAxis: {
      Max: 160,
      majorUnit: 5,
      line: {
        visible: false
      },
      labels: {
        step: 2
      }
    },
    categoryAxis: {
      categories: ["Sprint 23", "Sprint 40", "Sprint 57"],
      majorGridLines: {
        visible: false
      }
    },
    tooltip: {
      visible: true,
      template: "#= series.name #"
    }
  });
  $("#planned-security").kendoChart({
    title: {
      /*text: "Number of Requests "*/
    },
    legend: {
      visible: true,
      position: "bottom"
    },
    seriesDefaults: {
      type: "column",
      labels: {
        visible: true,
        background: "transparent",
        position: "center",
        color: "white"
      }
    },
    series: [{
      overlay: {
        gradient: "none"
      },
      name: "Planned In Sprint",
      stack: "Open",
      data: [100, 60, 80]
    }, {
      overlay: {
        gradient: "none"
      },
      name: "Planned Outside of Sprint",
      stack: "Complete",
      data: [80, 14, 50]
    }],
    seriesColors: ["#78C466", "#FF9900"],
    valueAxis: {
      Max: 160,
      majorUnit: 5,
      line: {
        visible: false
      },
      labels: {
        step: 2
      }
    },
    categoryAxis: {
      categories: ["Sprint 23", "Sprint 40", "Sprint 57"],
      majorGridLines: {
        visible: false
      }
    },
    tooltip: {
      visible: true,
      template: "#= series.name #"
    }
  });

  /*$("#planned-closed-data-protection").kendoChart({
    dataSource: {
      transport: {
        read: {
          url: "../../Charts/endpoints/data-protection.json",
          dataType: "json"
        }
      }/!*,
       sort: {
       field: "year",
       dir: "asc"
       }*!/
    },
    title: {
      text: "Planned/Closed requests by Data Protection"
    },
    legend: {
      position: "bottom"
    },
    seriesDefaults: {
      type: "line"
    },
    series: [{
      field: "planned",
      name: "Planned",
      color: "#69a2d6"
    }, {
      field: "closed",
      name: "Closed",
      color: "#78C466"
    }],
    categoryAxis: {
      categories: ["4< Weeks", "3< Weeks", "2< Weeks", "1< Week", "1> Week", "Weeks >2", "Weeks 3>", "Weeks 4>"],
      crosshair: {
        visible: true
      }
    },
    valueAxis: {
      Max: 50,
      majorUnit: 5
    },
    tooltip: {
      visible: true,
      /!*shared: true*!/
      template: "<strong>Sprint #= dataItem.sprint#</strong> <br> #= series.name #: #= value #"
      /!*sharedTemplate:kendo.template($("#template").html())*!/
      /!*template:"<strong>Sprint #= dataItem.sprint#</strong> <br> Planned: #=dataItem.planned # <br> Closed: #=dataItem.closed #"*!/
    }
  });*/
  $("#planned-closed-data-protection").kendoChart({
    title: {
      /*text: "Gross domestic product growth \n /GDP annual %/"*/
    },
    legend: {
      visible: true,
      position: "bottom",
      margin:{
        top:10
      }
    },
    chartArea: {
      background: ""
    },
    seriesDefaults: {
      type: "line",
      style: "smooth"
    },
    series: [{
      name: "Sprint 23 - Planned",
      data: [5, 7, 9 , 15 , 25, 10, 5, 3, 1],
      dashType:"solid"
    },{
      name: "Sprint 23 - Closed",
      data: [null, null, null, null,10, 20, 25, 13, 20],
      dashType:"longdash"
    },{
      name: "Sprint 24 - Planned",
      data: [14, 16, 8, 10, 35, 25, 12, 8, 3],
      dashType:"solid"
    },{
      name: "Sprint 24 - Closed",
      data: [null, null, null, null,20, 28, 30, 13, 20],
      dashType:"longdash"
    },{
      name: "Sprint 25 - Planned",
      data: [28, 30, 35, 40,41,35, 10, 5, 1],
      dashType:"solid"
    },{
      name: "Sprint 25 - Closed",
      data: [null, null, null, null,23, 38, 27, 10, 21],
      dashType:"longdash"
    }],
    seriesColors: ["#006495","#006495","#FF9900", "#FF9900","#732C7B","#732C7B"],
    valueAxis: {
      Max: 50,
      majorUnit: 5,
      line: {
        visible: true
      }
    },
    categoryAxis: {
      categories: ["4< Weeks", "3< Weeks", "2< Weeks", "1< Week", "Week 0", "1> Week", "2> Weeks", "3> Weeks", "4> Weeks"],
      majorGridLines: {
        visible: true
      },
      justified:true,
      labels: {
      },
      axisCrossingValue: 4
    },
    tooltip: {
      visible: true,
      template: "#= series.name #: #= value #"
    }
  });
  $("#planned-closed-security").kendoChart({
    dataSource: {
      transport: {
        read: {
          url: "../../Charts/endpoints/data-protection.json",
          dataType: "json"
        }
      }/*,
       sort: {
       field: "year",
       dir: "asc"
       }*/
    },
    title: {
      text: "Planned/Closed requests by Security"
    },
    legend: {
      position: "bottom"
    },
    seriesDefaults: {
      type: "line"
    },
    series: [{
      field: "planned",
      name: "Planned",
      color: "#579AD6"
    }, {
      field: "closed",
      name: "Closed",
      color: "#78C466"
    }, {
      xField: "week"
    }
    ],
    categoryAxis: {
      categories: ["Week1", "Week2", "Week3", "Week4", "Week1", "Week2", "Week3", "Week4", "Week1", "Week2", "Week3", "Week4"],
      crosshair: {
        visible: true
      }
    },
    valueAxis: {
      Max: 50,
      majorUnit: 5
    },
    tooltip: {
      visible: true,
      /*shared: true*/
      template: "<strong>Sprint #= dataItem.sprint#</strong> <br> #= series.name #: #= value #"
      /*template:"<strong>Sprint #= dataItem.sprint#</strong> <br> Planned: #=dataItem.planned # <br> Closed: #=dataItem.closed #"*/
    }
  });
}
function createSparklines() {
  // binding to array
  $("#data-protection-opened").kendoSparkline({
    title: {
      text: "Opened Requests"
    },
    seriesColors: ["#579AD6"],
    data: [
      30, 40, 10, 20, 10, 15, 5, 20, 10, 10, 30, 5
    ],
    color: "#579AD6",
    tooltip: {
      visible: true,
      format: "Opened : {0}"
    }
  });

  $("#data-protection-closed").kendoSparkline({
    title: {
      text: "Closed Requests"
    },
    type: "column",
    seriesColors: ["#78C466"],
    data: [
      30, 30, 10, 20, 10, 15, 5, 20, 10, 10, 30, 5
    ],
    color: "#78C466",
    tooltip: {
      visible: true,
      format: "Closed : {0}"
    }
  });

  $("#endpoints-opened").kendoSparkline({
    title: {
      text: "Opened Requests"
    },
    seriesColors: ["#579AD6"],
    data: [
      10, 30, 20, 10, 15, 10, 10, 10, 10, 10, 10, 20
    ],
    color: "#579AD6",
    tooltip: {
      visible: true,
      format: "Opened : {0}"
    }
  });


  $("#endpoints-closed").kendoSparkline({
    title: {
      text: "Closed Requests"
    },
    type: "column",
    seriesColors: ["#78C466"],
    data: [
      10, 30, 15, 10, 15, 10, 10, 10, 10, 10, 10, 20
    ],
    color: "#78C466",
    tooltip: {
      visible: true,
      format: "closed : {0}"
    }
  });
  $("#databases-opened").kendoSparkline({
    title: {
      text: "Opened Requests"
    },
    seriesColors: ["#579AD6"],
    data: [
      20, 20, 5, 10, 5, 20, 0, 20, 10, 5, 10, 10
    ],
    color: "#579AD6",
    tooltip: {
      visible: true,
      format: "Opened : {0}"
    }
  });


  $("#databases-closed").kendoSparkline({
    title: {
      text: "Closed Requests"
    },
    type: "column",
    seriesColors: ["#78C466"],
    data: [
      20, 20, 5, 10, 5, 20, 0, 15, 10, 5, 10, 10
    ],
    color: "#78C466",
    tooltip: {
      visible: true,
      format: "Closed : {0}"
    }
  });

  $("#security-opened").kendoSparkline({
    title: {
      text: "Opened Requests"
    },
    seriesColors: ["#579AD6"],
    data: [
      10, 10, 5, 20, 30, 20, 10, 20, 5, 5, 10, 15
    ],
    color: "#579AD6",
    tooltip: {
      visible: true,
      format: "Opened : {0}"
    }
  });


  $("#security-closed").kendoSparkline({
    title: {
      text: "Closed Requests"
    },
    type: "column",
    seriesColors: ["#78C466"],
    data: [
      10, 10, 5, 20, 30, 20, 10, 20, 5, 5, 10, 15
    ],
    color: "#78C466",
    tooltip: {
      visible: true,
      format: "Closed : {0}"
    }
  });

  $("#platforms-opened").kendoSparkline({
    title: {
      text: "Opened Requests"
    },
    seriesColors: ["#579AD6"],
    data: [
      10, 5, 10, 10, 30, 10, 5, 20, 5, 5, 10, 5
    ],
    color: "#579AD6",
    tooltip: {
      visible: true,
      format: "Opened : {0}"
    }
  });


  $("#platforms-closed").kendoSparkline({
    title: {
      text: "Closed Requests"
    },
    type: "column",
    seriesColors: ["#78C466"],
    data: [
      10, 5, 10, 10, 30, 10, 5, 20, 5, 5, 10, 5
    ],
    color: "#78C466",
    tooltip: {
      visible: true,
      format: "Closed : {0}"
    }
  });

  $("#windows-opened").kendoSparkline({
    title: {
      text: "Opened Requests"
    },
    seriesColors: ["#579AD6"],
    data: [
      10, 20, 10, 5, 10, 5, 5, 10, 10, 5, 20, 10
    ],
    color: "#579AD6",
    tooltip: {
      visible: true,
      format: "Opened : {0}"
    }
  });


  $("#windows-closed").kendoSparkline({
    title: {
      text: "Closed Requests"
    },
    type: "column",
    seriesColors: ["#78C466"],
    data: [
      10, 20, 10, 5, 10, 5, 5, 10, 10, 5, 20, 10
    ],
    color: "#78C466",
    tooltip: {
      visible: true,
      format: "Closed : {0}"
    }
  });

  $("#none-opened").kendoSparkline({
    title: {
      text: "Opened Requests"
    },
    seriesColors: ["#579AD6"],
    data: [
      10, 10, 10, 5, 10, 10, 5, 20, 20, 20, 5, 5
    ],
    color: "#579AD6",
    tooltip: {
      visible: true,
      format: "Opened : {0}"
    }
  });


  $("#none-closed").kendoSparkline({
    title: {
      text: "Closed Requests"
    },
    type: "column",
    seriesColors: ["#78C466"],
    data: [
      10, 10, 10, 5, 10, 10, 5, 20, 20, 20, 5, 5
    ],
    color: "#78C466",
    tooltip: {
      visible: true,
      format: "Closed : {0}"
    }
  });

  $("#sim-opened").kendoSparkline({
    title: {
      text: "Opened Requests"
    },
    seriesColors: ["#579AD6"],
    data: [
      0, 5, 10, 10, 10, 10, 20, 20, 30, 0, 15, 15
    ],
    color: "#579AD6",
    tooltip: {
      visible: true,
      format: "Opened : {0}"
    }
  });


  $("#sim-closed").kendoSparkline({
    title: {
      text: "Closed Requests"
    },
    type: "column",
    seriesColors: ["#78C466"],
    data: [
      0, 5, 10, 10, 10, 10, 20, 20, 30, 0, 15, 15
    ],
    color: "#78C466",
    tooltip: {
      visible: true,
      format: "Closed : {0}"
    }
  });


}

$(function () {
  createChart();
  createSparklines();
});
$(document).bind("kendo:skinChange", createChart);
$(document).bind("kendo:skinChange", createSparklines);