var image = null;
var canvas = null;
var rainbowImage = null;
var blurImage = null;

function upload(){
  canvas = document.getElementById("can");
  var file = document.getElementById("finput");
  image = new SimpleImage(file);
  rainbowImage = image;
  image.drawTo(canvas);
}

function resetImage(){
    var file = document.getElementById("finput");
  if( file == null){
    alert("Upload an image.")
  }
  else{
    var output = new SimpleImage(file);
    image = output;
    rainbowImage = output;
    blurImage = output;
    output.drawTo(canvas)
  }
  }

function doRainbow(){
   if (rainbowImage!==null) {     
    makeRainbow();	                      
    rainbowImage.drawTo(canvas);	          
  }
  else{
    alert("The image to convert isn't loaded. ")
  }
}

function makeRainbow(){
  var w = rainbowImage.getHeight();
  for (var pixel of rainbowImage.values()){
    var y = pixel.getY();
    var avg = (pixel.getRed() + pixel.getGreen()+pixel.getBlue())/3;
    if (y<w/7){ //section 1 red
      if(avg<128){
        pixel.setRed(2*avg);
        pixel.setBlue(0);
        pixel.setGreen(0);
      }
      else{
        pixel.setRed(255);
        pixel.setGreen(2*avg-255);
        pixel.setBlue(2*avg-255);
      }
    }
    if (y >= w/7 && y < 2*w/7){ //section 2 orange
      if(avg<128){
        pixel.setRed(2*avg);
        pixel.setBlue(0.8*avg);
        pixel.setGreen(0);
      }
      else{
        pixel.setRed(255);
        pixel.setGreen(1.2*avg-51);
        pixel.setBlue(2*avg-255);
      }
    }      
    if(y>=2*w/7 && y<3*w/7){ //section 3 yellow
      if(avg<128){
        pixel.setRed(2*avg);
        pixel.setBlue(2*avg);
        pixel.setGreen(0);
      }
      else{
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue(2*avg-255);
      }
    }
    if(y>=3*w/7 && y<4*w/7){ //section 4 green
      if(avg<128){
        pixel.setRed(0);
        pixel.setBlue(2*avg);
        pixel.setGreen(0);
      }
      else{
        pixel.setRed(2*avg-255);
        pixel.setGreen(255);
        pixel.setBlue(2*avg-255);
      }
    }
    if(y>=4*w/7 && y<5*w/7){ //section 5 blue
      if(avg<128){
        pixel.setRed(0);
        pixel.setBlue(0);
        pixel.setGreen(2*avg);
      }
      else{
        pixel.setRed(2*avg-255);
        pixel.setGreen(2*avg-255);
        pixel.setBlue(255);
      }
    }    
     if(y>=5*w/7 && y<6*w/7){ //section 6 indigo
      if(avg<128){
        pixel.setRed(0.8*avg);
        pixel.setBlue(0);
        pixel.setGreen(2*avg);
      }
      else{
        pixel.setRed(1.2*avg-51);
        pixel.setGreen(2*avg-255);
        pixel.setBlue(255);
      }
    }  
    if(y>=6*w/7 && y<w){ //section 7 violet
      if(avg<128){
        pixel.setRed(1.6*avg);
        pixel.setBlue(0);
        pixel.setGreen(1.6*avg);
      }
      else{
        pixel.setRed(0.4*avg+153);
        pixel.setGreen(2*avg-255);
        pixel.setBlue(0.4*avg+153);
      }
    }        
  }
}


function makeBlur(){
  blurImage = image;
  for (var pixel of image.values()){
    var p = Math.random();
    if(p<0.5){
      var x = pixel.getX();
      var y = pixel.getY();
    nearbypixel(x,y,pixel);
    }
  }
  blurImage.drawTo(canvas);
}

function nearbypixel(x,y,pixel){
  var i = Math.floor(Math.random() * 11);
  var xnew = x+i;
  var ynew = y+i;
  var w = image.getWidth();
  var h = image.getHeight();
  if (xnew< w && ynew< h){
    blurImage.setPixel(xnew, ynew, pixel);
  }
  else{
    blurImage.setPixel(x,y,pixel);
  }
}
