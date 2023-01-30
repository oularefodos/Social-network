
const configurationTheme = (mode) => ({
    palette : {
        mode : mode,
        ...(mode === "light" ?
        {
          primary : {
            main : "#00a8ff",
            dark : "##74b9ff",
            light : "#48dbfb"
          },
          secondary : {
            main : "#55efc4",
            light : "#ecf0f1",
            dark : "#dcdde1"
          }, 
          background : {
            default : "#f5f6fa"
          }
        }
        :
        {
          primary : {
            main : "#00a8ff",
            dark : "##74b9ff",
            light : "#48dbfb"
          },
          secondary : {
            main : "#48dbfb",
            light : "#f53b57",
            dark : "#2d3436"
          },
          background : {
            default : "#1e272e"
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