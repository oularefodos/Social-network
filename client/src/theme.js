
const configurationTheme = (mode) => ({
    palette : {
        mode : mode,
        ...(mode === "light" ?
        {
          primary : {
            main : "#82CAFA",
            dark : "##74b9ff",
            light : "#48dbfb"
          },
          secondary : {
            main : "#f5f6fa",
            light : "#F1F6F5",
            dark : "#E8E2E2"
          }, 
          background : {
            default : "#eeeeee"
          }
        }
        :
        {
          primary : {
            main : "#03224C",
            dark : "##74b9ff",
            light : "#48dbfb"
          },
          secondary : {
            main : "#333333",
            light : "#434242",
            dark : "#03001C"
          },
          background : {
            default : "#222222",
          }
        })
    },
    typography: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize : 12 ,
        h1 : {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize : 40 ,
        } ,
        h2 : {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize : 32 ,
        } ,
        h3 : {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize : 24 ,
        } ,
        h4 : {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize : 20 ,
        } ,
        h5 : {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize : 16 ,
        } ,
        h6: {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize : 14 ,
        } ,
      },
})

export default configurationTheme;