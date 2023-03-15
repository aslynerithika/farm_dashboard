import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#FFFFFF",
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
});

function NavHeader(){
  return(
    <>
      <nav>
        <div class="nav_logo_container">
          <img class="nav_logo" src="/Images/App/TransparentElancoLogo.png"></img>
          <a href="https://www.elanco.com/en-us" class="nav_logo_Button"></a>
          <div class="nav_logo_DarkBlueCircle"></div>
        </div>
        <div class="nav_title_container">
          <img class="page_icon" src="/Images/App/farmlogo2.png"></img>
          <h1 class="page_title">FARM DASHBOARD</h1>
        </div>
        <div class="nav_links">
          <ThemeProvider theme={theme}>
            <Link to="/"><Button>Home</Button></Link>
            <Link to="/landplots"><Button>Land Plots</Button></Link>
          </ThemeProvider>
        </div>
      </nav>
    </>
  );
}

export default NavHeader;
