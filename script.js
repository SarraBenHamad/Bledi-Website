const initSlider =() => {

    const images =document.querySelector(".slider-wrapper .images");
    const slideButtons =document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar =document.querySelector(".container .slider-scrollbar");
    const scrollbarThumb =sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = images.scrollWidth -images.clientWidth;

    scrollbarThumb.addEventListener("mousedown",(e) =>{

        const startX =e.clientX;
        const thumbPosition=scrollbarThumb.offsetLeft;

        //update thumb position on move
        const handleMouseMove =(e) =>{
            const deltaX =e.clientX -startX;
            const newThumbPosition =thumbPosition + deltaX;
            const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width -scrollbarThumb.offsetWidth;
            const boundedPosition =Math.max(0,Math.min(maxThumbPosition,newThumbPosition));

            const scrollPosition=(boundedPosition/maxThumbPosition)* maxScrollLeft ;
            scrollbarThumb.style.left=`${boundedPosition}px`;
            images.scrollLeft=scrollPosition; 
        }

        const handleMouseUp =() =>{
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

//Slide images according to the slide button clicks
    slideButtons.forEach(button =>{
        button.addEventListener("click",() =>{
            const direction=button.id ==="prev-slide"? -1 : 1;
            const scrollAmount =images.clientWidth * direction;
            images.scrollBy({ left: scrollAmount, behavior: "smooth"});

        });
    });

    const handleSlideButtons = () => {
        slideButtons[0].style.display=images.scrollLeft <= 0 ? "none" : "block"; 
        slideButtons[1].style.display=images.scrollLeft >=  maxScrollLeft ? "none" : "block"; 
    }
//update scrillbar thumb postion based on image scroll
    const updateScrollThumbPosition =() =>{
        const scrollPosition = images.scrollLeft;
        const thumbPosition =(scrollPosition/ maxScrollLeft)*(sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left=`${thumbPosition}px`;
    }

    images.addEventListener("scroll",() => {
        handleSlideButtons();
        updateScrollThumbPosition();

    });

}


window.addEventListener("load",initSlider);


function showSidebar(){
    //to select a css element
    const sidebar =docuùment.querySelector(".sidebar");
    sidebar.style.display="flex";

}
function hideSidebar(){
    const sidebar =document.querySelector(".sidebar");
    sidebar.style.display="none";
}
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 50 ||
    document.documentElement.scrollTop > 50
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document


mybutton.addEventListener("click", function() {
    window.scrollTo({
      top: 0,
      behavior: "smooth" // Smooth scrolling effect
    });
  });
  function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  
}

