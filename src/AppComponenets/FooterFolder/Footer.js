import './Footer.css';

var script = document.createElement('script');
script.src = 'https://kit.fontawesome.com/1d482a1a8c.js';
script.setAttribute('crossorigin', 'anonymous');
document.head.appendChild(script);


function Footer(){
  return(
    <>
      <footer>
        <div class = "mediaLinks">
          <a href='https://www.instagram.com/weareelanco/' target="_Blank"><i class="fa-brands fa-instagram"></i></a> 
        <a href='https://twitter.com/Elanco/' target="_Blank" ><i class="fa-brands fa-twitter"></i></a> 
        <a href='https://www.facebook.com/elancoanimalhealth/' target="_Blank" ><i class="fa-brands fa-facebook"></i></a>
        </div>
      </footer>
    </>
  );
}

export default Footer;