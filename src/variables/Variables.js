const defaultWidth = window.screen.width > 768 ? window.screen.width * 1 / 3 : window.screen.width;

const style = {
  Wrapper: {},
  Containers: {
    DefaultStyle: {
      position: "fixed",
      width: defaultWidth,
      padding: "10px 10px 10px 20px",
      zIndex: 9998,
      WebkitBoxSizing: "",
      MozBoxSizing: "",
      boxSizing: "",
      height: "auto",
      display: "inline-block",
      border: "0",
      fontSize: "14px",
      WebkitFontSmoothing: "antialiased",
      fontFamily: '"Roboto","Helvetica Neue",Arial,sans-serif',
      fontWeight: "400",
      color: "#FFFFFF"
    },

    tl: {
      top: "0px",
      bottom: "auto",
      left: "0px",
      right: "auto"
    },

    tr: {
      top: "0px",
      bottom: "auto",
      left: "auto",
      right: "0px"
    },

    tc: {
      top: "0px",
      bottom: "auto",
      margin: "0 auto",
      left: "50%",
      marginLeft: -(defaultWidth / 2)
    },

    bl: {
      top: "auto",
      bottom: "0px",
      left: "0px",
      right: "auto"
    },

    br: {
      top: "auto",
      bottom: "0px",
      left: "auto",
      right: "0px"
    },

    bc: {
      top: "auto",
      bottom: "0px",
      margin: "0 auto",
      left: "50%",
      marginLeft: -(defaultWidth / 2)
    }
  },

  NotificationItem: {
    DefaultStyle: {
      position: "relative",
      width: "100%",
      cursor: "pointer",
      borderRadius: "4px",
      fontSize: "14px",
      margin: "10px 0 0",
      padding: "10px",
      display: "block",
      WebkitBoxSizing: "border-box",
      MozBoxSizing: "border-box",
      boxSizing: "border-box",
      opacity: 0,
      transition: "all 0.5s ease-in-out",
      WebkitTransform: "translate3d(0, 0, 0)",
      transform: "translate3d(0, 0, 0)",
      willChange: "transform, opacity",

      isHidden: {
        opacity: 0
      },

      isVisible: {
        opacity: 1
      }
    },



    success: {
      borderTop: 0,
      backgroundColor: "#a1e82c",
      WebkitBoxShadow: 0,
      MozBoxShadow: 0,
      boxShadow: 0
    },

    error: {
      borderTop: 0,
      backgroundColor: "#fc727a",
      WebkitBoxShadow: 0,
      MozBoxShadow: 0,
      boxShadow: 0
    },

    warning: {
      borderTop: 0,
      backgroundColor: "#ffbc67",
      WebkitBoxShadow: 0,
      MozBoxShadow: 0,
      boxShadow: 0
    },

    info: {
      borderTop: 0,
      backgroundColor: "#63d8f1",
      WebkitBoxShadow: 0,
      MozBoxShadow: 0,
      boxShadow: 0
    }
  },

  Title: {
    DefaultStyle: {
      fontSize: "30px",
      margin: "0",
      padding: 0,
      fontWeight: "bold",
      color: "#FFFFFF",
      display: "block",
      left: "15px",
      position: "absolute",
      top: "50%",
      marginTop: "-15px"
    }
  },

  MessageWrapper: {
    DefaultStyle: {
      marginLeft: "55px",
      marginRight: "30px",
      padding: "0 12px 0 0",
      color: "#FFFFFF",
      maxWidthwidth: "89%"
    }
  },

  Dismiss: {
    DefaultStyle: {
      fontFamily: "inherit",
      fontSize: "21px",
      color: "#000",
      float: "right",
      position: "absolute",
      right: "10px",
      top: "50%",
      marginTop: "-13px",
      backgroundColor: "#FFFFFF",
      display: "block",
      borderRadius: "50%",
      opacity: ".4",
      lineHeight: "11px",
      width: "25px",
      height: "25px",
      outline: "0 !important",
      textAlign: "center",
      padding: "6px 3px 3px 3px",
      fontWeight: "300",
      marginLeft: "65px"
    },

    success: {
      // color: '#f0f5ea',
      // backgroundColor: '#a1e82c'
    },

    error: {
      // color: '#f4e9e9',
      // backgroundColor: '#fc727a'
    },

    warning: {
      // color: '#f9f6f0',
      // backgroundColor: '#ffbc67'
    },

    info: {
      // color: '#e8f0f4',
      // backgroundColor: '#63d8f1'
    }
  },

  Action: {
    DefaultStyle: {
      background: "#ffffff",
      borderRadius: "2px",
      padding: "6px 20px",
      fontWeight: "bold",
      margin: "10px 0 0 0",
      border: 0
    },

    success: {
      backgroundColor: "#a1e82c",
      color: "#ffffff"
    },

    error: {
      backgroundColor: "#fc727a",
      color: "#ffffff"
    },

    warning: {
      backgroundColor: "#ffbc67",
      color: "#ffffff"
    },

    info: {
      backgroundColor: "#63d8f1",
      color: "#ffffff"
    }
  },

  ActionWrapper: {
    DefaultStyle: {
      margin: 0,
      padding: 0
    }
  }
};



//
// //
// // // // For dashboard's charts
// //
//
// Data for Pie Chart
const dataPie = {
  labels: ["40%", "20%", "40%"],
  series: [40, 20, 40]
};
const legendPie = {
  names: ["Open", "Bounce", "Unsubscribe"],
  types: ["info", "danger", "warning"]
};

// Data for Line Chart
const dataSales = {
  labels: [
    "9:00AM",
    "12:00AM",
    "3:00PM",
    "6:00PM",
    "9:00PM",
    "12:00PM",
    "3:00AM",
    "6:00AM"
  ],
  series: [
    [287, 385, 490, 492, 554, 586, 698, 695],
    [67, 152, 143, 240, 287, 335, 435, 437],
    [23, 113, 67, 108, 190, 239, 307, 308]
  ]
};
const optionsSales = {
  low: 0,
  high: 800,
  showArea: false,
  height: "245px",
  axisX: {
    showGrid: false
  },
  lineSmooth: true,
  showLine: true,
  showPoint: true,
  fullWidth: true,
  chartPadding: {
    right: 50
  }
};
const responsiveSales = [
  [
    "screen and (max-width: 640px)",
    {
      axisX: {
        labelInterpolationFnc(value) {
          return value[0];
        }
      }
    }
  ]
];
const legendSales = {
  names: ["Open", "Click", "Click Second Time"],
  types: ["info", "danger", "warning"]
};

// Data for Bar Chart
const dataBar = {
  labels: [
    "React",
    "Angular",
    "MongoDB",
    "GraphQL",
  ],
  series: [
    [3, 7, 5, 8],
  ]
};
const optionsBar = {
  seriesBarDistance: 10,
  low: 0,
  high: 10,
  chartPadding: {
    top: 30,
    right: 20,
    bottom: 20,
    left: 10
  },
  axisX: {
    showGrid: true
  },
  height: "300px"
};
const responsiveBar = [
  [
    "screen and (max-width: 640px)",
    {
      seriesBarDistance: 5,
      axisX: {
        labelInterpolationFnc(value) {
          return value[0];
        }
      }
    }
  ]
];
const legendBar = {
  names: ["Skills"],
  types: ["primary"]
};
// Imagine you have a list of languages that you'd like to autosuggest.
const languages = [
  {
    name: 'devops',
    year: 1972
  },{
    name: 'cloud',
    year: 1972
  },{
    name: 'data science',
    year: 1972
  },{
    name: 'Jenkins',
    year: 1972
  },{
    name: 'Kubernetes',
    year: 1972
  },{
    name: 'big-data',
    year: 1972
  },{
    name: 'docker',
    year: 1972
  },{
    name: 'Android',
    year: 1972
  },
  {
    name: 'Reactive',
    year: 1972
  }, {
    name: 'aws',
    year: 1972
  }, {
    name: 'mongodb',
    year: 1972
  }, {
    name: 'mysql',
    year: 1972
  }, {
    name: 'oracle',
    year: 1972
  }, {
    name: 'dynammodb',
    year: 1972
  }, {
    name: 'neo4j',
    year: 1972
  },
  {
    name: 'react',
    year: 1972
  },
  {
    name: 'management',
    year: 1972
  },
  {
    name: 'C#',
    year: 2000
  },
  {
    name: 'C++',
    year: 1983
  },
  {
    name: 'Clojure',
    year: 2007
  },
  {
    name: 'Elm',
    year: 2012
  },
  {
    name: 'Go',
    year: 2009
  },
  {
    name: 'Haskell',
    year: 1990
  },
  {
    name: 'Java',
    year: 1995
  },
  {
    name: 'Javascript',
    year: 1995
  },
  {
    name: 'Perl',
    year: 1987
  },
  {
    name: 'PHP',
    year: 1995
  },
  {
    name: 'Python',
    year: 1991
  },
  {
    name: 'Ruby',
    year: 1995
  },
  {
    name: 'Scala',
    year: 2003
  }
];

 


const adminCards = [
  {
    name: 'Lynda',
    color: 'blue',
    enrollment: 3300,
    logoImage: 'lynda.jpg',
    logoAlt: 'lynda.com',
    stars: 5,
  },
  {
    name: 'Udemy',
    color: 'orange',
    enrollment: 5430,
    logoImage: 'Udemy.jpg',
    logoAlt: 'Udemy.com',
    stars: 3,
  },
  {
    name: 'edureka !',
    color: '',
    enrollment: '1500+',
    logoImage: 'edureka.jpg',
    logoAlt: 'edureka.co',
    stars: 2,
  },
  {
    name: 'Pluralsight',
    color: 'green',
    enrollment: 2030,
    logoImage: 'pluralsight.jpg',
    logoAlt: 'pluralsight.com',
    stars: 4,
  },
  {
    name: 'Coursera',
    color: 'red',
    enrollment: 1280,
    logoImage: 'coursera.png',
    logoAlt: 'Coursera.com',
    stars: 3,
  },
  {
    name: 'Safari',
    color: 'purple',
    enrollment: 7380,
    logoImage: 'orm.jpg',
    logoAlt: 'Safari.com',
    stars: 2.5,
  }
 
];
const ImgeUrls={
  l:'lynda.jpg',
  u:'Udemy.jpg',
  e:'edureka.jpg',
  p:'pluralsight.jpg',
  c:'coursera.png',

}

module.exports = {
  style,
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar,
  adminCards,
  languages,
  ImgeUrls
};
