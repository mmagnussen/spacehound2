const styles = `<style>

@import url('https://fonts.googleapis.com/css?family=Abel|Libre+Franklin|Montserrat&display=swap');
@import url('https://fonts.googleapis.com/css?family=Cousine&display=swap');

/*
font-family: 'Libre Franklin', sans-serif;
font-family: 'Montserrat', sans-serif;
font-family: 'Abel', sans-serif;
font-family: 'Cousine', monospace;
*/

/* Button Styling */
.read-more-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height .2s ease;
   
  }
  
  .read-more-toggle {
    display: none;
    border-radius:20%;
  }
  
  .read-more-toggle-label {
    display: inline-block;
    user-select: none;
    cursor: pointer;
    border: none;
    padding: .5em;
    /* margin: .5em; */
    font-size: .8em;
    background: #555;
    color: white;
    border-radius: 4px;
  }
  
  .read-more-toggle-label:after {
    /*content: "More";*/
    display: inline-block;
    
  }
/*
  section{
      margin-bottom: 1em;
  }
  */
  
  .read-more-toggle:checked + .read-more-content {
    display: block;
    /* css animation won't work with "auto"; set to some height larger
      than the content */
    max-height: 10000px;
  }
  
  .read-more-toggle:checked + .read-more-content + .read-more-toggle-label:after {
    content: "Less";
  }
  
  article {
    border-bottom: 1px solid gray;
    padding-top: .4em;
  }
  
  article p {
    margin: .6em;
    padding-left: 2.5em;
  }


/* content */

body {
    margin: 0;
    background:#000 url(http://www.script-tutorials.com/demos/360/images/stars.png) repeat top center;
  }
  
  canvas {
    
    vertical-align: bottom;
  }


/* Reporting Font */
.montserrat {
    font-family: 'Montserrat', sans-serif;
   }

/* Regex Font */
.franklin {
    font-family: 'Cousine', monospace;
    font-size: .8em;
    font-weight: bold;
    /* letter-spacing: 0.1em; */
    background-color: beige;
    border-radius: 6px;
    padding: .2em;
    vertical-align: baseline;
    }

div.pageBackground {
    /* color: rgb(20, 20, 75) */
   /* background:#000 url(http://www.script-tutorials.com/demos/360/images/stars.png) repeat top center; */
}


    h1 {
        margin: 6px;
        font-size: 4em;
        text-align: center;
        letter-spacing: 0.4em;
        font-family: 'Abel', sans-serif;
        animation: flow 12s ease-in-out infinite;
        background: linear-gradient(-80deg, #909090, #e8e8e8, #000000e7);
        background-size: 200%;
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        
    }

    @keyframes flow {
        0% {
            background-position: 0 50%;
        }

        50% {
            background-position: 100% 50%;
        }
            100% {
                background-position: 0 50%;
            }
    }

    img{
        background: transparent;
        margin: 0 auto;
     width: 100px; 
    }

.green {
    color: green;
}

.red {
    color: red;
}

section {
    /* margin: 4px; */
    padding: 2px;
}

section p {
    font-family: 'Montserrat', sans-serif;
    margin: 4px;
    font-size: .9em;

}

div.contentBackground {
    background-color: lightgray;
    margin: 0em 2em 2em 2em;
    min-width: 500px; 
    border-radius: 25px;
    border: 2px solid #eeeeee;
    /*box-shadow: inset 0em 0.3em 0.3em black;*/
    z-index: 10;
}

div.contentContainer {
    padding: 2em;
}
  
</style>`;

module.exports = styles;